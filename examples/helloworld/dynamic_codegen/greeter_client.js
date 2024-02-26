/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/exercici.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var exercici_proto = grpc.loadPackageDefinition(packageDefinition).exercici;

function main() {

  var target = 'localhost:50051';

  var client = new exercici_proto.YourService(target,
    grpc.credentials.createInsecure());

  var user_name;
  var user_mail;
  
  user_name = 'Àlvaro';
  user_mail = 'akumenius@gmail.com';
  
  client.GetUser({ email: user_mail }, function(err, response) {
    console.log('La informació de usuari demanat:', response);
  });

  client.AddUser({ name: user_name, email: user_mail }, function(err, response) {
    console.log('Has afegit el següent usuari:', response);
  });

  client.GetUser({ email: user_mail }, function(err, response) {
    console.log('La informació de usuari demanat:', response);
  });

  /*var operationRequest = {
    number1: 3,
    number2: 2,
    operation: 'sum'
  };

  client.Operation(operationRequest, function (err, response) {
    console.log('Result:', response);
  });*/

}

main();
