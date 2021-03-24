## Upload files to Google Buckets 

**Pricing:**  Free

This task accepts the following inputs:

**Paths |** `paths` - Paths to the files you wish to upload, supports minimax patterns and supports multiple entries.

**Bucket Name** | `bucket` - Name of Google bucket to upload files.

**Keyfile** | `keyfile` - The JSON keyfile credentials needed to write to the target bucket. Select a previously uploaded secure file (Secure File Id). [More Information](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/secure-files?view=azure-devops)

***Advanced Options***

**Destination Directory** | `destinationDirectory` - The directory within the bucket that the files should be uploaded. Is created if it doesn't exist.

**Clear Destination** | `clear` - If selected will delete all files at the destination prior to uploading selected files. Warning: Selecting this while NOT providing a `Destination Directory` will result in the entire contents of the bucket being deleted!


**Disclaimer:** This task is provided free as is. The creators accept no liability for it's use.
