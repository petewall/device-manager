.PHONY: set-pipeline

deploy-device-manager: deployment/device-service.yaml
	kapp deploy -a device-manager -f deployment --diff-changes

ci/pipeline.yaml: ci/pipeline-template.yaml ci/pipeline-values.yaml
	ytt -f ci/pipeline-template.yaml -f ci/pipeline-values.yaml > ci/pipeline.yaml

set-pipeline: ci/pipeline.yaml
	fly -t wallhouse set-pipeline --pipeline device-manager --config ci/pipeline.yaml --load-vars-from ../secrets/pipeline-creds.json
