#!/bin/bash
echo '*****************************'
echo 'Creating MySql User wsource'
echo '*****************************'

set -e
mysql --protocol=socket -uroot -p$MYSQL_ROOT_PASSWORD <<EOSQL
CREATE USER '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';
GRANT SELECT, INSERT, DELETE, UPDATE, ALTER ON wsourcedb.* TO '$MYSQL_USER'@'localhost';
EOSQL