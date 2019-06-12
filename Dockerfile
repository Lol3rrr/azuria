FROM python:2.7.16-stretch

WORKDIR /usr/src/app

COPY ./src/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./src/ .

EXPOSE 80

CMD [ "python", "./app.py" ]
