export const DevMode = false; // TODO: change to false for production
export const baseUrl = "https://cors-anywhere.herokuapp.com/" + "https://validation-v2.brainsimulation.eu"; // TODO: change to "https://validation-v1.brainsimulation.eu" for production 
export const querySizeLimit = 10;//100000;
export const collaboratoryOrigin = 'https://wiki.humanbrainproject.eu';
export const hashChangedTopic = '/clb/community-app/hashchange';
export const updateSettingsTopic = '/clb/community-app/settings';
export const isParent = (window.opener == null);
export const isIframe = (window !== window.parent);
export const isFramedApp = isIframe && isParent;
export const settingsDelimiter = ",";
export const filterKeys = ["species", "brain-region", "cell-type",
	"model-scope", "abstraction-level", "license",
	"test-type", "score-type", "recording-modality", "test-status"]
export const filterModelKeys = ["species", "brain-region", "cell-type",
	"model-scope", "abstraction-level"]
export const filterModelInstanceKeys = ["license"]
export const filterTestKeys = ["species", "brain-region", "cell-type",
	"test-type", "score-type", "recording-modality", "test-status"]
export const filterTestInstanceKeys = []
export const displayValid = ["Only Models", "Models & Tests", "Only Tests"];
export const queryValid = ["model_id", "model_alias", "test_id", "test_alias", "result_id"]

export const updateHash = (value) => {
	window.location.hash = value;
	if (isFramedApp) {
		window.parent.postMessage({
			topic: hashChangedTopic,
			data: value
		}, collaboratoryOrigin);
	};
};