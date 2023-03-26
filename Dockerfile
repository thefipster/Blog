FROM ruby:3.1 as build
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*
RUN gem install bundler jekyll
WORKDIR /app
COPY . .
RUN bundle install
RUN bundle exec jekyll build

FROM nginx as publish
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/_site /usr/share/nginx/html/
