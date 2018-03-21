
"""
    So, It seems that if you hide the ELK ports en the localhost... logstash is not able to reach Elasticsearch... even if Kibana can.
    I didn't find the solution yet... Even if It might be possible directly... ?
    If you manage to use the plugins to allow http output with logstash you could be able to make L and E to communicate throught Nginx.. If needed.
"""


import spur
import pycurl
try:
    import StringIO
except ImportError:
    from io import StringIO

ELK_host = '82.196.10.240'
ELASTICSEARCH = {
    'ip': "82.196.10.240",
    # 'port': "9200",
    'admin_port': "9200",
    'ping_port': "9200",
    'proxy_admin_port': "8071",
    'proxy_ping_port': "8070",
    'username': "elastic",
    'password': "elkmdp456"
}

# If true the chosen docker-compose and configurations are those who are made for working with proxy
# PROXY = True
PROXY = False



####
# Docker-Compose
####
def deploy_elk_compose (shell, localshell, target_host):
    """
        This is the current function used to deploy ELK using the docker-compose file
    """
    install_docker_compose_on_remote_machine (shell, localshell, target_host)
    send_docker_elk_compose (localshell, target_host)

    #not usefull since the compose file is already providing this fonctionality
    # create_docker_volume(shell, localshell, target_host)
    # print "docker volume ok"

    build_docker_compose (shell, localshell, target_host)
    print "Docker build compose OK"
    
    # raw_input("Please wait till ELK goes green, then press a key... : ")
    elasticsearch_wait_ping_ok()
    print "ping ok!"

    configure_kibana (shell, localshell, target_host)
    print "configure kibana ok"

    setup_filebeat_template(shell, localshell, target_host)
    print "setup kibana for filebeat ok"
    

    #put the proxy here but will be the first thing later.....
    # deploy_reverse_proxy_for_elk(shell, localshell, target_host)

def create_docker_volume(shell, localshell, target_host):
    """
        Check is the volumes already exist.. if not then it creates it
    """

    cmd = "docker volume inspect elasticsearch-volume".format()
    result = shell.run(cmd.split(), cwd=".", allow_error=True)

    #meaning this volume does not exist
    if result.return_code == 1 :
        cmd = "docker volume create elasticsearch-volume".format()
        result = shell.run(cmd.split(), cwd=".", allow_error=False)

def install_docker_compose_on_remote_machine (shell, localshell, target_host):  
    """
        This is just to install docker-compose on the machine
    """
    # 3.6.0
    result = localshell.run(["ssh", "root@"+target_host, "curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s `-`uname -m` -o /usr/local/bin/docker-compose"])
    result = localshell.run(["ssh", "root@"+target_host, "chmod +x /usr/local/bin/docker-compose"])
    # result = localshell.run(["ssh", "root@"+target_host, "docker-compose --migrate-to-labels"])
    # print result.output

def send_docker_elk_compose (localshell, target_host):
    """
        This sends the docker-elk folder that will be used to generate the containers
    """
    cmd = "scp -r docker-elk root@{}:.".format(target_host)
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)

def uninstall_docker_compose (shell, localshell, target_host):
    """
        Just in case this is needed... it can uninstall docker-compose
    """
    cmd = "rm /usr/local/bin/docker-compose"
    result = localshell.run(["ssh", "root@"+target_host, cmd])

def build_docker_compose (shell, localshell, target_host):
    """
        This commands builds images and run containers based on docker-compose.yml
    """

    if PROXY == True :
        result = shell.run(["docker-compose", "--file", "docker-elk/docker-compose_proxy_settings.yml", "up", "-d",  "--build"])
        
    else :
        result = shell.run(["docker-compose", "--file", "docker-elk/docker-compose.yml", "up", "-d",  "--build"])

def configure_kibana (shell, localshell, target_host): 
    """
        This creates the index pattern for data comming from logstash... I didn't realy used it...
        I've just been fallowing docs..
    """
    #Create an index pattern via the Kibana API:
    if PROXY == True :
        cmd = "curl -XPOST -D- 'http://localhost:5601/api/saved_objects/index-pattern' "\
                "-H 'Content-Type: application/json' "\
                "-H 'kbn-version: 6.2.1' "\
                "-d '{\"attributes\":{\"title\":\"logstash-*\",\"timeFieldName\":\"@timestamp\"}}'"
    else :
        cmd = "curl -XPOST -D- 'http://82.196.10.240:5601/api/saved_objects/index-pattern' "\
            "-H 'Content-Type: application/json' "\
            "-H 'kbn-version: 6.2.1' "\
            "-d '{\"attributes\":{\"title\":\"logstash-*\",\"timeFieldName\":\"@timestamp\"}}'"
        
    result = localshell.run(["ssh", "root@"+target_host, cmd]).output
    print result


####
# Nginx Proxy
####
def deploy_reverse_proxy_for_elk (shell, localshell, target_host):
    """
        This is tu put the Nginx proxy online... It will bind external ports to internals ports of the ELK containers
    """
    
    #in case there already is a nginx instance : 
    cmd="nginx -s quit"
    result = shell.run(cmd.split(), cwd=".", allow_error=True)        

    if PROXY == True :

        cmd = "apt-get install nginx"
        result = shell.run(cmd.split(), cwd=".", allow_error=False)  
        #if no succes launch this one  
        # cmd = "yes | apt-get install nginx"

        #need to scp the config
        cmd = "scp -r ./reverse_proxy root@{}:.".format(target_host)
        result = localshell.run(cmd.split(), cwd=".", allow_error=False)



        cmd = "apt-get install apache2-utils"
        result = shell.run(cmd.split(), cwd=".", allow_error=False)      
        #if no success, launcg this one : 
        # yes | apt-get install apache2-utils



        #set the user + password for nginx (Will be used to provide authentication for each http requests)
        cmd = "htpasswd -db /etc/nginx/.htpasswd {} {}".format(ELASTICSEARCH['username'], ELASTICSEARCH['password'] )
        result = shell.run(cmd.split(), cwd=".", allow_error=False)        
        


        #This is how you can test if this is working : 
        #when try to acces  :
        # curl -i username:password@ip_adress:port
        # HTTP/1.1 200 OK

        #run the proxy
        cmd = "nginx -p $PWD/reverse_proxy/ -c $PWD/reverse_proxy/nginx.conf"
        result = localshell.run(["ssh", "root@"+target_host, cmd])
    


####
# FileBeat
####
def deploy_filebeats(shell, localshell, target_host):
    shell = spur.SshShell(hostname=target_host, username="root") 

    #in case this is already on

    cmd = "curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-6.2.1-amd64.deb"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)
    cmd = "dpkg -i filebeat-6.2.1-amd64.deb"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)

    filebeat_change_config(shell, localshell, target_host, mode="deploy")

    # cmd = "filebeat modules enable nginx"
    # result = shell.run(cmd.split(), cwd=".", allow_error=False)

    #NOPE    
    # cmd = "filebeat setup"
    # result = shell.run(cmd.split(), cwd=".", allow_error=False)
    # filebeat_setup_elastic (shell, localshell, target_host)


    cmd = "service filebeat start"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)

def setup_filebeat_template(shell, localshell, target_host):
    cmd = "curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-6.2.1-amd64.deb"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)
    cmd = "dpkg -i filebeat-6.2.1-amd64.deb"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)

    filebeat_change_config(shell, localshell, target_host, mode="setup")

    # cmd = "filebeat modules enable nginx"
    # result = shell.run(cmd.split(), cwd=".", allow_error=False)

    cmd = "filebeat setup --dashboards"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)


def filebeat_change_config(shell, localshell, target_host, mode=None):
    
    if mode=='deploy': 
        if PROXY == True :
            cmd = "scp ./filebeat_deploy_proxy_settings.yml root@{}:/etc/filebeat/filebeat.yml".format(target_host)
        else :
            cmd = "scp ./filebeat_deploy.yml root@{}:/etc/filebeat/filebeat.yml".format(target_host)
        result = localshell.run(cmd.split(), cwd=".", allow_error=False)

        cmd = "/etc/init.d/filebeat restart"
        result = shell.run(cmd.split(), cwd=".", allow_error=False)

    elif mode=='setup':
        print "filebeat change config"
        if PROXY == True :
            cmd = "scp ./filebeat_setup_proxy_settings.yml root@{}:/etc/filebeat/filebeat.yml".format(target_host)
        else :
            cmd = "scp ./filebeat_setup.yml root@{}:/etc/filebeat/filebeat.yml".format(target_host)
        result = localshell.run(cmd.split(), cwd=".", allow_error=False)
        
    else : 
        print("wrong mode for filebeat_change_config")





def elasticsearch_wait_ping_ok ():
    """
        This is used to wait for elasticsearch to be ready (running)
    """
    from datetime import datetime
    from elasticsearch import Elasticsearch
    import time

    if PROXY == True :
        es = Elasticsearch([{'host': ELASTICSEARCH['ip'], 'port': ELASTICSEARCH['proxy_ping_port']}])

    else :
        es = Elasticsearch([{'host': ELASTICSEARCH['ip'], 'port': ELASTICSEARCH['ping_port']}])
        

    while not es.ping():
        time.sleep(1)


def docker_total_kill (shell, localshell, target_host):
    """
        Destroy docker container, images and volumes...
    """
    
    # cmd = "docker-compose down"
    cmd = "docker-compose stop"
    result = localshell.run(["ssh", "root@"+target_host, cmd], allow_error=True)

    cmd = "docker kill $(docker ps -q)"
    result = localshell.run(["ssh", "root@"+target_host, cmd], allow_error=True)

    cmd = "docker rm $(docker ps -a -q)"
    result = localshell.run(["ssh", "root@"+target_host, cmd], allow_error=True)
    
    # cmd = "docker rmi -f $(docker images -q)"
    # result = localshell.run(["ssh", "root@"+target_host, cmd], allow_error=True)

    # cmd = "docker volume ls -qf dangling=true | xargs -r docker volume rm"
    # result = localshell.run(["ssh", "root@"+target_host, cmd], allow_error=True)

    cmd = "docker swarm leave --force"
    result = localshell.run(["ssh", "root@"+target_host, cmd], allow_error=True)

    print "docker total kill done"




###
# Not finished work to automatise tranfert of key to prepare ssh proxy
###    

def generate_new_ssh_key(shell=None, localshell=None, target_host=None, key_name=None):
    cmd = 'yes | ssh-keygen -t rsa -f ~/ssh-key/{} -q -N ""'.format(key_name)
    result = shell.run(cmd.split(), cwd=".", allow_error=False)


def transfer_publickey (localshell=None, source_host=None, target_host=None, key_name=None): 
    # cmd = "scp root@{}:ssh-key/{}.pub root@{}:.ssh/authorized_keys/{}".format(source_host, key_name, target_host, key_name)
    # result = localshell.run(cmd.split(), cwd=".", allow_error=False)

    cmd = "scp root@{}:ssh-key/{}.pub ./temp_key".format(source_host, key_name)
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)

    # cmd = "scp ./temp_file_key root@{}:.ssh/authorized_keys/{}".format(target_host, key_name)
    cmd = "scp ./temp_key root@{}:.ssh/temp_key".format(target_host)
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)

    cmd = "rm ./temp_key"
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)

    target_shell = spur.SshShell(hostname=target_host, username="root") 

    cmd =  "cat .ssh/temp_key >> .ssh/authorized_keys"
    result = target_shell.run(cmd.split(), cwd=".", allow_error=False)
    
    cmd = "rm .ssh/temp_key"
    result = target_shell.run(cmd.split(), cwd=".", allow_error=False)
    



####
# No title...
####
def ask_for_ip():
    new_dev_ip = raw_input("Please enter the ip of new-dev: ")
    print new_dev_ip
    return new_dev_ip

def install_certificates (shell=None, localshell=None, target_host=None, domain_name=None):
    shell = spur.SshShell(hostname=target_host, username="root")
    
    cmd = "wget https://dl.eff.org/certbot-auto".format()
    result = shell.run(cmd.split(), cwd=".", allow_error=False)

    cmd = "chmod a+x ./certbot-auto".format()
    result = shell.run(cmd.split(), cwd=".", allow_error=False)   

    cmd = "yes | ./certbot-auto certonly --standalone -d {} -m andrew.davison@unic.cnrs-gif.fr --agree-tos".format(domain_name)
    result = shell.run(cmd.split(), cwd=".", allow_error=False)

###
# Command used to create a new DEV... might not work the first time but everything needed is there.
###

def create_new_dev (shell=None, localshell=None, target_host=None):
    cmd = "cld node create new-dev"
    result = localshell.run(cmd.split(), cwd=".", allow_error=False).output

    new_dev_ip = ask_for_ip()

    install_certificates(target_host=new_dev_ip, domain_name="validation-dev.brainsimulation.eu")

    cmd = "cld build validation-service --remote new-dev"
    result = localshell.run(cmd.split(), cwd=".", allow_error=False).output 

    #here goes the command to run it..




#####
# Functions for Logstash forwarder.... (one of the three option to secure)
# This is work in progress but I would not recomand going for this solution
#####
def deploy_logstash_forwarder (shell, localshell, target_host):
    """
        This is work in progress if you decide to use Logstash alongside Beats
        to send the data through http and not Socks5
    """
    prepare_logstash_forwarder_container(shell, localshell,target_host)
    run_logstash_forwarder(shell, localshell, target_host)

def prepare_logstash_forwarder_container(shell, localshell, target_host) : 
    result = shell.run(["docker", "pull", "docker.elastic.co/logstash/logstash:6.2.1"])
    cmd = "scp ./docker-elk/logstash/config/logstash.yml root@{}:.".format(target_host)
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)
    cmd = "scp ./docker-elk/logstash/pipeline/logstash_forwarder.conf root@{}:.".format(target_host)
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)

def run_logstash_forwarder (shell, localshell,target_host):
    cmd ="docker stop logstash"
    result = shell.run(cmd.split(), cwd=".", allow_error=True)
    cmd ="docker rm logstash"
    result = shell.run(cmd.split(), cwd=".", allow_error=True)

    # cmd = "docker run --name logstash -p 5044:5044 -v /root/logstash.yml:/usr/share/logstash/config/logstash.yml -v /root/logstash.conf:/usr/share/logstash/config/logstash.conf -v /root/logstash.conf:/usr/share/logstash/pipeline/logstash.conf docker.elastic.co/logstash/logstash:6.2.1"
    # cmd = "docker run --name logstash -p 127.0.0.1:5044:5044 -v /root/logstash_forwarder.yml:/usr/share/logstash/config/logstash.yml -v /root/logstash_forwarder.conf:/usr/share/logstash/config/logstash.conf -v /root/logstash_forwarder.conf:/usr/share/logstash/pipeline/logstash.conf docker.elastic.co/logstash/logstash:6.2.1"
    cmd = "docker run --name logstash -p 127.0.0.1:5044:5044 -v /root/logstash.yml:/usr/share/logstash/config/logstash.yml -v /root/logstash_forwarder.conf:/usr/share/logstash/pipeline/logstash.conf docker.elastic.co/logstash/logstash:6.2.1"
    
    result = shell.run(cmd.split(), cwd=".", allow_error=False)



####
# Could still be usefull
####
def deploy_elasticsearch (shell, localshell,target_host ):
    """
        This was made before using docker compose to start the container individualy, but is not realy usefull anymore
    """
    prepare_elasticsearch_container(shell, localshell,target_host)
    run_elasticsearch(shell, localshell)

def prepare_elasticsearch_container(shell, localshell, target_host) : 
    result = shell.run(["docker", "pull", "docker.elastic.co/elasticsearch/elasticsearch:6.2.1"])
    cmd = "scp ./elasticsearch.yml root@{}:.".format(target_host)
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)

def run_elasticsearch (shell, localshell, target_host):
    cmd = "docker run -v /root/filebeat.yml:/usr/share/filebeat/filebeat.yml docker.elastic.co/beats/filebeat:6.2.1"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)

def deploy_kibana (shell, localshell, target_host):
    """
        This was made before using docker compose to start the container individualy, but is not realy usefull anymore
    """
    prepare_kibana_container(shell, localshell,target_host)
    run_kibana(shell, localshell)

def prepare_kibana_container(shell, localshell, target_host) : 
    result = shell.run(["docker", "pull", "docker.elastic.co/kibana/kibana:6.2.1"])
    cmd = "scp ./kibana.yml root@{}:.".format(target_host)
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)

def run_kibana (shell, localshell,target_host):
    cmd = "docker run -v /root/kibana.yml:/usr/share/filebeat/filebeat.yml docker.elastic.co/kibana/kibana:6.2.1"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)

def deploy_filebeats_container (shell, localshell, target_host):
    """
        This has been done when I was trying to run filbeat in container...
        Everything was ok, but since the logs are in the root files docker had trouble 
        to acces it... it could be interesting go back on it since I wasn't far from the solution
        but not mandatory..
    """
    shell = spur.SshShell(hostname=target_host, username="root") #, password="password1")

    cmd = "docker pull docker.elastic.co/beats/filebeat:6.2.1".format()
    build_directory = "."
    result = shell.run(cmd.split(), cwd=build_directory, allow_error=False)

    cmd = "scp ./filebeat.yml root@{}:.".format(target_host)
    result = localshell.run(cmd.split(), cwd=".", allow_error=False)

    cmd = (
            "docker run -v /root/filebeat.yml:/usr/share/filebeat/filebeat.yml " 
            "-v /var/lib/docker/containers:/usr/share/filebeat/containers_from_host:Z "
            "-v  /var/log:/usr/share/filebeat/logs_from_host:Z "
            "docker.elastic.co/beats/filebeat:6.2.1 setup --dashboards"
    )

    # cmd = "docker run -v /root/filebeat.yml:/usr/share/filebeat/filebeat.yml docker.elastic.co/beats/filebeat:6.2.1 setup --dashboards"
    result = shell.run(cmd.split(), cwd=".", allow_error=False)

    # docker run docker.elastic.co/beats/filebeat:6.2.2 setup --dashboards


def rerun_filebeats_container(shell, localshell, target_host):
    shell = spur.SshShell(hostname=target_host, username="root") #, password="password1")
    # cmd = (
    #         "docker run -v /root/filebeat.yml:/usr/share/filebeat/filebeat.yml "
    #         "-v /var/lib/docker/containers:/usr/share/filebeat/containers_from_host:Z "
    #         "-v  /var/log:/usr/share/filebeat/logs_from_host:Z "
    #         "docker.elastic.co/beats/filebeat:6.2.1"
    # )
    cmd = (
            "docker run -v /root/filebeat.yml:/usr/share/filebeat/filebeat.yml "
            # "-v /var/lib/docker/containers:/usr/share/filebeat/containers_from_host:ro "
            # "-v  /var/log:/usr/share/filebeat/logs_from_host:ro "
            "-v /root/fakefile.log:/usr/share/filebeat/log_test/fakefile.log "
            "docker.elastic.co/beats/filebeat:6.2.1"
    )
    result = shell.run(cmd.split(), cwd=".", allow_error=False)



####
# I'v made some trial to put it to swarm mode.... but was not urgent
# so I din't go further...
####
def deploy_elk_swarm(shell, localshell, target_host):
    install_docker_compose_on_remote_machine (shell, localshell, target_host)
    # send_docker_elk_compose (localshell, target_host)
    # docker_swarm_init(shell, localshell, target_host)

    # docker_stack_deploy(shell, localshell, target_host)
    # build_docker_compose (shell, localshell, target_host)

    # configure_kibana (shell, localshell, target_host)

    #to add workers
    #docker swarm --join --token <TOKEN> --advertise-addr <IP-ADDRESS-OF-WORKER-1> <IP-ADDRESS-OF-MANAGER>:2377 


def docker_swarm_init(shell, localshell, target_host):
    cmd = "docker swarm init --advertise-addr {}".format(target_host)
    # cmd = "docker swarm init --advertise-addr {}".format("test")
    result = shell.run(cmd.split(), cwd=".", allow_error=False)


def docker_stack_deploy (shell, localshell, target_host):
    result = shell.run(["docker", "stack", "deploy", "-c", "docker-elk/docker-compose.yml", "test"])



if __name__ == '__main__':
    localshell = spur.LocalShell()

    wanted_mode = raw_input("What mode: 1=elk, 2=filebeat, 4=elk total kill 5=elk proxy, 6=test socks5 proxy ")
    MODE = {"1": "elk" , "2": "filebeat" ,  "4": "elk total kill", "5": "elk proxy", "6": "test socks5 proxy" }
    MODE = MODE[wanted_mode]


    if MODE == "elk" :
        """
            This command is used to deploy the ELK docker-compose, without changing anything about Nginx proxy
        """
        elk_host = "82.196.10.240"
        elk_shell = spur.SshShell(hostname=elk_host, username="root")

        #Carfull : this one is dangerous... you might want to modify it...
        docker_total_kill(elk_shell, localshell, target_host=elk_host)

        deploy_elk_compose (elk_shell, localshell, target_host=elk_host)

    elif MODE == "filebeat" :
        """
            This command is used to deploy a filebeat on a target machine (were you want to collect logs)
        """
        

        beat_host = "37.139.23.107"
        beat_shell = spur.SshShell(hostname=beat_host, username="root")
        deploy_filebeats(beat_shell, localshell, beat_host)

        # deploy_logstash_forwarder(beat_shell, localshell, beat_host)


    elif MODE == "elk total kill":
        """
            This command is used if you want to clean up all the containers and docker images on the machine
        """
        elk_host = "82.196.10.240"
        elk_shell = spur.SshShell(hostname=elk_host, username="root")        
        docker_total_kill(elk_shell, localshell, target_host=elk_host)

    elif MODE =="elk proxy":
        """
            This command is used if you want to deploy Nginx proxy + SSL certificates on the ELK machine.
        """
        elk_host = "82.196.10.240"
        elk_shell = spur.SshShell(hostname=elk_host, username="root") 
        deploy_reverse_proxy_for_elk(shell=elk_shell, localshell=localshell, target_host=elk_host)

    elif MODE == "test socks5 proxy":
        """
            This command is not realy usefull.... some work in progress arround Socks5 but the functions are not finished.
        """
        elk_host = "82.196.10.240"
        elk_shell = spur.SshShell(hostname=elk_host, username="root") 

        key_name ="test_key"

        # generate_new_ssh_key(shell=elk_shell, localshell=localshell, target_host=elk_host, key_name=key_name)

        beat_host = "37.139.23.107"
        transfer_publickey(localshell=localshell, source_host=elk_host, target_host=beat_host, key_name=key_name)



    else : 
        print "Not an available option"
        

    
