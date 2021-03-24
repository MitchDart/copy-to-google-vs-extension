const { basename } = require('path')
const { Storage } = require('@google-cloud/storage')
const tl = require('azure-pipelines-task-lib/task')
const { SecureFileHelpers } = require('azure-pipelines-tasks-securefiles-common/securefiles-common')

function pathExistsAsFile(path) {
  try {
    return tl.stats(path).isFile()
  } catch (error) {
    tl.debug(error)
    return false
  }
}

const workingDirectory = tl.getVariable('System.DefaultWorkingDirectory');
console.log(`Current Working Directory: ${workingDirectory}`)

const paths = tl.getDelimitedInput('paths', '\n', true)
console.log(`Paths: ${paths.join(';')}`)

const bucketName = tl.getInput('bucket', true)
console.log(`Bucket Name: ${bucketName}`)

const keyfile = tl.getInput('keyfile', true)

const destinationDirectory = tl.getInput('destinationDirectory', false)
destinationDirectory && console.log(`Destination Directory: ${destinationDirectory}`)

const clearDestination = tl.getBoolInput('clear', false)
clearDestination && console.log(`Clearing Destination Directory`)
clearDestination && !destinationDirectory && console.warn(
  'WARNING: Clear destination directory has been selected but no destination directory has been specified, all files will be deleted.'
);

(async () => {
  const helper = new SecureFileHelpers(8)
  const keyfilePath = await helper.downloadSecureFile(keyfile)
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyfilePath
  const storage = new Storage()

  if (clearDestination) {
    await storage.bucket(bucketName).deleteFiles({ directory: destinationDirectory })
  }

  await Promise.all(tl.findMatch(workingDirectory, paths).filter(pathExistsAsFile).map(async (path) => {
    try {
      console.log(`Uploading ${path}...`)
      await storage.bucket(bucketName).upload(path, {
        destination: destinationDirectory ? `${destinationDirectory}/${basename(path)}` : basename(path),
        gzip: true,
      })
      console.log(`Uploaded ${path}!`)
    } catch (error) {
      tl.setResult(tl.TaskResult.SucceededWithIssues, 'Some files were not successfully uploaded', false)
    }
  }))

  tl.setResult(tl.TaskResult.Succeeded, 'All files successfully uploaded', true)
})()
