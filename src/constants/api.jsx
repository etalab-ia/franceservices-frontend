let apiBase;

if (import.meta.env.MODE === 'development') {
	apiBase = import.meta.env.VITE_REACT_APP_API_URL;
}
else {
	apiBase = '';
}

export const	apiUrl = apiBase + "/api/v2/stream"
export const    indexesUrl = apiBase + "/api/v2/indexes";
export  const	institutionsUrl = apiBase + "/api/v2/institutions"
export const	signinUrl = apiBase + "/api/v2/sign_in"
export const	signoutUrl = apiBase + "/api/v2/sign_out"
export const	resetPasswordMailUrl = apiBase + "/api/v2/send_reset_password_email"
export const	resetPasswordUrl = apiBase + "/api/v2/reset_password"
export const    userUrl = apiBase + "/api/v2/user/me"
export const    importUrl = "https://opendata.plus.transformation.gouv.fr/api/explore/v2.1/catalog/datasets/export-expa-c-riences/records?limit=5"
