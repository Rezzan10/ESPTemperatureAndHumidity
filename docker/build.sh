docker build -t rezzan/temperature-api:1.0.0 -f ./docker/api/Dockerfile ./api
docker build -t rezzan/temperature-server:1.0.0 -f ./docker/nginx/Dockerfile .