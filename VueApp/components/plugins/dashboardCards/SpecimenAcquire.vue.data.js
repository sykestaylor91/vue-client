module.exports =
    {
        specimenHistory: { //load from specimen customdata
            timeStamp: '2012-04-23T18:25:43.511Z',
            userFullName: 'UnknownUser',
            laboratory: 'Default Laboratory',
            department: 'Accessioning',
            location: 'Station 1',
            workflowStep: 'Recieved'
        },
        currentWorkflow: { //load from specimen customdata
            name: 'Default Workflow',
            currentStep: 'Received',
            currentStepTat: 4,
            laboratory: 'Default Laboratory',
            department: 'Accessioning',
            location: 'Station 1',
            userFullName: 'Unknown User',
            stepStarted: '2017-03-28T18:25:43.511Z',
            lastUpdated: '2017-03-28T18:25:43.511Z',
            available: true,
            steps: [
                'Received',
                'Stored'
            ]
        },
        allWorkFlows: null //load from organization per specimen
    };