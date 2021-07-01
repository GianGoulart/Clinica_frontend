import axios from "axios";

function setUrl(url, id = null) {
	if (!id) return url;

	return `${url}/${id}`;
}
		// baseURL:"http://localhost:5055/v1/",		

async function request(config) {
	config = {
		baseURL:"https://clinica-abrao-api-7w3sjlxr4a-uc.a.run.app/v1/", 	 	
		method: "GET",
		timeout: 60000,
		...config,
		headers: {
			"Content-Type": "application/json",
			...config.headers,
		},
	};
	return new Promise((resolve, reject) =>
		axios
			.request(config)
			.then((res) => resolve(res.data))
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 401) {
						window.location.reload();
					} else if (error.response.status === 503)

					return reject(error);
				}

				if (error.response && error.response.data)
					reject(error.response.data);
				else reject(error);
			})
	);
}

async function del(url, id = null, params = {}, otherConfigs = {}) {
	return request({
		method: "DELETE",
		params,
		url: setUrl(url, id),
		...otherConfigs,
	});
}

async function get(url, params = {}, id = null, otherConfigs = {}) {
	return request({
		params,
		url: setUrl(url, id),
		...otherConfigs,
	});
}

async function post(url, data = {}, params = {}, otherConfigs = {}) {
	return request({
		data,
		method: "POST",
		params,
		url,
		...otherConfigs,
	});
}

async function put(url, data = {}, id = null, params = {}, otherConfigs = {}) {
	return request({
		data,
		method: "PUT",
		params,
		url: setUrl(url, id),
		...otherConfigs,
	});
}

export {
	del as deleteRequestService,
	get as getRequestService,
	post as postRequestService,
	put as putRequestService,
};

const RequestService = {
	delete: del,
	get,
	post,
	put,
};

export default RequestService;
