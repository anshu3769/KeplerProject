# Use an official Python runtime as an image
FROM python:3.6.7

# Copy all essentials file
COPY ./requirements.txt /usr/src/Kepler-OnBoarding-Project/Backend/requirements.txt

# Work Directory
WORKDIR /usr/src/Kepler-OnBoarding-Project/Backend

# Install requirements
RUN pip install -r requirements.txt

# Copy the rest
COPY . /usr/src/Kepler-OnBoarding-Project/Backend

# Expose Port
EXPOSE 5000

# Start application
CMD [ "python", "run.py"]
