export const DevMode = false;
export const baseUrl = "https://validation-v1.brainsimulation.eu";
export const collaboratoryOrigin = 'https://wiki.humanbrainproject.eu';
export const hashChangedTopic = '/clb/community-app/hashchange';
export const updateSettingsTopic = '/clb/community-app/settings';
export const isParent = (window.opener == null);
export const isIframe = (window !== window.parent);
export const isFramedApp = isIframe && isParent;
export const settingsDelimiter = ",";
export const filterKeys = ["species", "brain_region", "cell_type",
						   "organization", "model_scope", "abstraction_level",
						   "test_type", "score_type", "data_modality", "status"]
export const filterModelKeys = ["species", "brain_region", "cell_type",
								"organization", "model_scope", "abstraction_level"]
export const filterTestKeys = ["species", "brain_region", "cell_type",
							   "test_type", "score_type", "data_modality", "status"]
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