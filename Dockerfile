#
# Build an image for deploying the Brain Simulation Platform Validation Service
#
# To build the image, from the parent directory:
#   docker build -t hbp_validation_service -f validation_service/Dockerfile .
#
# To run the application:
#   docker run -d -p 443 hbp_validation_service


FROM debian:jessie-slim
MAINTAINER Andrew Davison <andrew.davison@unic.cnrs-gif.fr>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update --fix-missing; apt-get -y -q install python-dev python-pip sqlite3 python-psycopg2 supervisor build-essential nginx-extras python-yaml python-requests python-markdown
RUN unset DEBIAN_FRONTEND

RUN pip install --upgrade pip
RUN pip install uwsgi

RUN echo "" >> /var/log/django.log

ENV SITEDIR /home/docker/site

COPY validation_service $SITEDIR


# COPY packages /home/docker/packages


COPY model_validation_api /home/docker/model_validation_api
# COPY build_info.json $SITEDIR

WORKDIR /home/docker
RUN pip install -r $SITEDIR/requirements.txt
ENV PYTHONPATH  /home/docker:/home/docker/site:/usr/local/lib/python2.7/dist-packages:/usr/lib/python2.7/dist-packages

WORKDIR $SITEDIR
RUN if [ -f $SITEDIR/db.sqlite3 ]; then rm $SITEDIR/db.sqlite3; fi
RUN python manage.py check

# RUN python manage.py collectstatic --noinput

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s $SITEDIR/deployment/nginx-app.conf /etc/nginx/sites-enabled/
RUN ln -s $SITEDIR/deployment/supervisor-app.conf /etc/supervisor/conf.d/
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 443
# EXPOSE 8000

CMD ["supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisor-app.conf"]
