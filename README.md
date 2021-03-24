# Copy To Google

This Visual studio extension targets a build/release task. It can be used to upload any number of files to a Google cloud stored Bucket.

It also offers the ability to define a destination directory and the ability to clear that destination directory before uploading the files.

The task can accept many paths, separated by a newline. The paths accept a minimatch pattern.

The keyfile is expected to be a secure file within the azure dev ops project the build is running. The pipeline will need to be granted access to the file.

It is important to note that if `clear` is specified as `true` and `destinationDirectory` is not or is empty then the entire contents of the bucket will be deleted before the specified files are uploaded.

### Example Usage

```yaml
  - task: CopyToGoogleStorage@15
    inputs:
      paths: |
        docs/**/*.md
        README.md
      bucket: 'my-bucket'
      keyfile: 'my-gcp-keyfile.json'
      destinationDirectory: 'my-destination'
      clear: true
```

### Build

In order to build this you must simply run

```
npm install
```

### Tests

There are no tests... :-(

That is a bad thing, we would gladly accept any pull request to add some tests.

### Contributing

If you wish to contribute to this project, please fork this repo and submit a pull request for consideration. Pull requests should always have a relevant issue. So please ensure an issue exists before submitting a pull request.
