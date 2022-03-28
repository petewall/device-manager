.PHONY: set-pipeline
set-pipeline:
	fly -t wallhouse set-pipeline --pipeline device-manager --config ci/pipeline.yaml --load-vars-from ../secrets/pipeline-creds.json
