# Use the official Python image as a base
FROM python:3.9-slim AS base

# Create workdir
RUN mkdir -p /backend

# Set the working directory to /code
WORKDIR /backend

# Copy the current directory contents into the container at /code
COPY . /backend

ENV VIRTUAL_ENV=/backend/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Install project dependencies
RUN pip install -r reqs.txt
RUN pip install uvicorn>=0.29.0
RUN python3 -c "import nltk; nltk.download('vader_lexicon', download_dir='/usr/local/share/nltk_data')"

# Expose a port
EXPOSE 8000

# Run our FastAPI server using uvicorn
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 8000"]