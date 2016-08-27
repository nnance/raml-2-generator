import * as path from 'path'
import { loadApi, api10 as API } from 'raml-1-parser'

function listMethods(resource: API.Resource) {
  const methods = resource.type() ? resource.type().resourceType().methods() : resource.methods()
  methods.forEach(method => console.log(`Method name: ${method.method()}`))
}

function listResources(api: API.Api | API.Resource) {
    api.resources().forEach(res => {
      console.log(`Resource name: ${res.displayName()}`)
      listMethods(res)
      if (res.resources()) {
        listResources(res)
      }
    })
}

const fName = path.resolve(__dirname, '../specs/api.raml')
const loader: Promise<API.Api> = loadApi(fName)
loader.then(api => {
  console.log('api loaded')
  listResources(api)
})
