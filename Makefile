.PHONY: set-pipeline

deploy-device-manager: deployment/device-service.yaml
	kapp deploy -a device-manager -f deployment --diff-changes

ci/pipeline.yaml: ci/pipeline-template.yaml ci/pipeline-values.yaml
	ytt -f ci/pipeline-template.yaml -f ci/pipeline-values.yaml > ci/pipeline.yaml

set-pipeline: ci/pipeline.yaml
	fly -t wallhouse set-pipeline --pipeline device-manager --config ci/pipeline.yaml

deploy:
	kapp deploy \
		--app device-manager \
		--diff-changes \
		--into-ns device-manager \
		--file deployment/namespace.yaml \
		--file deployment/device-service.yaml \
		--file deployment/firmware-service.yaml \
		--file deployment/ota-service.yaml \
		--file deployment/ingress.yaml
