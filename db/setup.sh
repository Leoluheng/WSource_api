# build wsourcedb image from dockerfile
docker build --tag dbImage .
# start a docker container and open port 3306
docker run --name dbContainer -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d dbImage
