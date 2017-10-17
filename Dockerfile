FROM ubuntu:14.04

MAINTAINER jakewmeyer

#Install dependencies
RUN sudo apt-get update \
    && sudo apt-get install software-properties-common -y \
    && sudo apt-get install build-essential unzip -y \
    && sudo apt-get install python3.5 python3.5-dev -y \
    && sudo apt-get install ffmpeg -y \
    && sudo apt-get install libopus-dev -y \
    && sudo apt-get install libffi-dev -y \
    && sudo apt-get update -y

#Install Pip
RUN sudo apt-get install wget \
    && wget https://bootstrap.pypa.io/get-pip.py \
    && sudo python3.5 get-pip.py

ADD . /HAL
WORKDIR /HAL

#Install PIP dependencies
RUN sudo pip install -r requirements.txt

CMD python3.5 hal.py