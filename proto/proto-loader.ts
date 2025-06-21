import { loadPackageDefinition } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { join } from 'path'

const PROTO_PATH = join(process.cwd(), 'proto/auth.proto')

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const protoDescriptor = loadPackageDefinition(packageDefinition)
const routeguide = protoDescriptor.routeguide

console.log(routeguide)
