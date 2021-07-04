# Reset Mot de passe MySQL 5.7 sur Ubuntu 16.04

## Dans le terminal

	# Stop MySQL
	sudo service mysql stop
	# Make MySQL service directory.
	sudo mkdir /var/run/mysqld
	# Give MySQL user permission to write to the service directory.
	sudo chown mysql: /var/run/mysqld
	# Start MySQL manually, without permission checks or networking.
	sudo mysqld_safe --skip-grant-tables --skip-networking &
	# Log in without a password.
	mysql -uroot mysql

## Dans mysql

	UPDATE mysql.user SET authentication_string=PASSWORD('rootroot'), plugin='mysql_native_password' WHERE User='root' AND Host='localhost';
	EXIT;

## A nouveau dans le terminal

	# Turn off MySQL.
	sudo mysqladmin -S /var/run/mysqld/mysqld.sock shutdown
	# Start the MySQL service normally.
	sudo service mysql start