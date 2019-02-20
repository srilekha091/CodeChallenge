# Reader Job Runner
ItemSense is software that enables businesses to monitor and manage their Impinj RFID environment. It makes it easy to monitor the health status of each reader in the environment, and allows you to "power on" a set of readers to begin working together on an operation.

[MicroSense&trade;](https://github.com/impinj/microsense) is an api that emulates the behaviour described above. For this challenge, you will build a UI for MicroSense&trade;.

## Objectives
MicroSense&trade; exposes a list of readers in the system, the health issues in the system, the types of operations your readers can work on, and an endpoint to instruct your readers to begin performing work. Build a front-end application that consumes MicroSense&trade; to accomplish the following:
- Display a list of readers in the system.
- Display the health status of each reader alongside that reader.
- Allow the user to select a set of readers, select an operation from those available, and press a "Start Job" button to run a job.
- If a reader has a health status of `ERROR`, do not allow the user to start a job with it.
- If a reader has a health status of `WARNING`, allow the user to start the job, but display a warning message bellow the job start button.
- See the readme of MicroSense&trade; for documentation on how to retrieve readers, health status, operations, and how to start a job.

## Rubric
- We will focus on code organization and composability (i.e. if we need to select a set of readers for another use case, how much of your code is reusable?).
- We have a huge focus on test coverage and ease of testibility on our team. If you are able to implement tests, excellent. If not, have you thought about the testability of the components in your UI? Be prepared to discuss this.
- Don't spend a ton of time making things pretty, but absolutely take into account the user experience when architecting your ui.
