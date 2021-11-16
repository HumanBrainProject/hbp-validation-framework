#
# Build an image for deploying the EBRAINS Validation Service
#
# To build the image, from the parent directory:
#   docker build -t hbp_validation_service_v2 -f deployment/Dockerfile .
#
# To run the application:
#   docker run -d -p 443 -v /etc/letsencrypt:/etc/letsencrypt \
#              -e KG_SERVICE_ACCOUNT_REFRESH_TOKEN \
#              -e KG_SERVICE_ACCOUNT_CLIENT_ID \
#              -e KG_SERVICE_ACCOUNT_SECRET \
#              hbp_validation_service_v2

FROM debian:buster-slim

MAINTAINER Andrew Davison <andrew.davison@cnrs.fr>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update --fix-missing; apt-get -y -q install python-pkg-resources python3-pkg-resources python3-pip supervisor build-essential nginx-extras git wget
RUN unset DEBIAN_FRONTEND

RUN pip3 install --upgrade pip

RUN git clone https://github.com/apdavison/pyxus.git --branch=pystache-jinja2 --single-branch pyxus_src
RUN pip3 install -r pyxus_src/pyxus/requirements.txt; pip install pyxus_src/pyxus
RUN git clone https://github.com/apdavison/fairgraph.git --branch=master --single-branch
RUN pip3 install ./fairgraph

ENV SITEDIR /home/docker/site

COPY requirements.txt.lock $SITEDIR/
RUN pip3 install -r $SITEDIR/requirements.txt.lock

COPY validation_service $SITEDIR/validation_service
RUN wget https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json -O $SITEDIR/validation_service/spdx_licences.json

ENV PYTHONPATH  /home/docker:/home/docker/site:/usr/lib/python2.7/dist-packages/:/usr/local/lib/python3.7/dist-packages:/usr/lib/python3.7/dist-packages

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN rm /etc/nginx/sites-enabled/default
COPY deployment/nginx-app.conf /etc/nginx/sites-enabled/
COPY deployment/supervisor-app.conf /etc/supervisor/conf.d/
#RUN ln -sf /dev/stdout /var/log/nginx/access.log
#RUN ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 443
#EXPOSE 80

CMD ["supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisor-app.conf"]
