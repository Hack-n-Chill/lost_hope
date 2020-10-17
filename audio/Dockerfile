	FROM python:3.7.9-slim-buster

LABEL maintainer="Bisakh Mondal <bisakhmondal00@gmail.com>"
LABEL SERVICE="FLASK TTS BACKEND"

RUN apt-get update && apt-get install -y apache2

RUN apt-get install -yqq pkg-config build-essential \
                            gcc apt-utils libc-dev libsndfile1

RUN service apache2 start
RUN gcc -v

COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt
RUN pip install lws==1.2.6  --use-feature=2020-resolver
RUN python -m nltk.downloader cmudict
RUN pip install torch==1.6.0+cpu torchvision==0.7.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
RUN pip install flask_cors AudioSegment pydub

COPY . /audioengine
WORKDIR /audioengine/

ENV PYTHONPATH="${PYTHONPATH}:/audioengine/voice"

EXPOSE 5000

CMD ["gunicorn","--bind","0.0.0.0:5000", "wsgi:app"]
