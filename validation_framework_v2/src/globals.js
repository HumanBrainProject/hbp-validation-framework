export const DevMode = false; // TODO: change to false for production
export const baseUrl = "https://validation-v2.brainsimulation.eu";
export const querySizeLimit = 10;//100000;
export const collaboratoryOrigin = 'https://wiki.humanbrainproject.eu';
export const hashChangedTopic = '/clb/community-app/hashchange';
export const updateSettingsTopic = '/clb/community-app/settings';
export const isParent = (window.opener == null);
export const isIframe = (window !== window.parent);
export const isFramedApp = isIframe && isParent;
export const settingsDelimiter = ",";
export const filterKeys = ["species", "brain_region", "cell_type",
	"model_scope", "abstraction_level", "license",
	"test_type", "score_type", "recording_modality", "test_status"]
export const filterModelKeys = ["species", "brain_region", "cell_type",
	"model_scope", "abstraction_level"]
export const filterModelInstanceKeys = ["license"]
export const filterTestKeys = ["species", "brain_region", "cell_type",
	"test_type", "score_type", "recording_modality", "test_status"]
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