# build wsourcedb image from dockerfile
docker build --tag dbimage .
# start a docker container and open port 3306
docker run --name dbcontainer -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d dbimage
