import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";

import * as s3bucket from "./s3bucket"

// Create a k8s provider.
const provider = new k8s.Provider("provider", {
    namespace: "crossplane-system",
});

const bucket = new s3bucket.s3.v1beta1.Bucket("s3bucket", {
    metadata: {
        name: "s3bucket",
    },
    spec: {
        forProvider: {
            acl: "private",
            locationConstraint: "eu-central-1",
            accelerateConfiguration: {
                status: "Enabled"
            },
            versioningConfiguration: {
                status: "Enabled"
            },
            tagging: {
                tagSet: [
                      { 
                        "key": "k1",
                        "value": "v1"
                      }
                ]
            },
            objectLockEnabledForBucket: false,
        },
        providerConfigRef: {
            name: "default"
        }
    }
},  { provider: provider });




