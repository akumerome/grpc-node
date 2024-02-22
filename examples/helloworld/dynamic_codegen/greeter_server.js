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


// 1 CARREGA EL FITXER DEL PROTOCOL BUFFER

// Especifica la ruta al fitxer del protocol buffer
var PROTO_PATH = __dirname + '/../../protos/exercici.proto';

// Dependències necessàries per treballar amb gRPC i carregar buffers de protocol
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

// Carrega el protocol buffer de manera sincrònica
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var exercici_proto = grpc.loadPackageDefinition(packageDefinition).exercici;


// 2 IMPLEMENTA MÈTODES RPC

// Aquests mètodes s'invocaràn quan els clients facin les sol·licituds corresponents
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});  
}

function sayHelloAgain(call, callback) {
  callback(null, {message: 'Hello again, ' + call.request.name});
}

function GetUser(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});  
}

// 3 INICIA SERVIDOR RPC
function main() {

  // Crea una nova instància del servidor gRPC
  var server = new grpc.Server();

  // Afegeix el servei YourService amb els mètodes RPC implementats
  server.addService(exercici_proto.YourService.service, {GetUser: GetUser});

  // Enllaça el servidor a l'adreça '0.0.0.0:50051' amb credencials insegures
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

// Engega el servidor
main();
