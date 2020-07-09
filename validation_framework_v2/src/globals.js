// NOTE: dummy data (in 'dev_data' directory) for DevMode is from v1 APIs; needs to be updated for v2 usage
export const DevMode = false; // TODO: change to false for production
export const baseUrl = "https://validation-v2.brainsimulation.eu";
export const querySizeLimit = 1000000;
export const collaboratoryOrigin = 'https://wiki.humanbrainproject.eu';
export const hashChangedTopic = '/clb/community-app/hashchange';
export const updateSettingsTopic = '/clb/community-app/settings';
export const isParent = (window.opener == null);
export const isIframe = (window !== window.parent);
export const isFramedApp = isIframe && isParent;
export const settingsDelimiter = ",";

export const filterCommonKeys = ["species", "brain_region", "cell_type"]
export const filterModelOnlyKeys = ["model_scope", "abstraction_level"]
export const filterTestOnlyKeys = ["test_type", "score_type", "recording_modality", "implementation_status"]
export const filterKeys = [...new Set([...filterCommonKeys, ...filterModelOnlyKeys, ...filterTestOnlyKeys])]
export const filterModelKeys = [...new Set([...filterCommonKeys, ...filterModelOnlyKeys])]
export const filterTestKeys = [...new Set([...filterCommonKeys, ...filterTestOnlyKeys])]
export const filterModelInstanceKeys = ["license"]
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