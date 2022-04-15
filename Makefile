.PHONY: set-pipeline

deploy-device-manager: deployment/device-service.yaml
	kapp deploy -a device-manager -f deployment/device-service.yaml --diff-changes

set-pipeline:
	fly -t wallhouse set-pipeline --pipeline device-manager --config ci/pipeline.yaml --load-vars-from ../secrets/pipeline-creds.json
