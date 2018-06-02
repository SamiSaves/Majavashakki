### Install MongoDB using Vagrant ###

1. Install Virtual Box and Vagrant
2. Run `vagrant up` inside `local-services` directory

### Install local MongoDB as windows service ###
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#get-mongodb-community-edition

1. Created folders:

C:\MongoData
C:\MongoData\db
C:\MongoData\log

2. Created yaml configuration file:

C:\MongoData\mongod.cfg
content => (
systemLog:
 destination: file
 path: C:\MongoData\log\mongod.log
storage:
 dbPath: C:\MongoData\db
 )
 
 3. Run from administrator cmd (from mongo installation bin folder or if env var exists)
 
 mongod.exe --config "C:\MongoData\mongod.cfg" --install
