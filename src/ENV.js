/* eslint-disable import/prefer-default-export */

// Local develop env for Drake
// export const CONFIG = {
//     "PORTAL": "http://localhost:1337"
// }

// Server env
export const CONFIG = {
	PORTAL: "http://localhost:1337",
};

export const FETCH = {
	PORT: {
		S: `${CONFIG.PORTAL}/students`,
		SC: `${CONFIG.PORTAL}/students-courses`,
		C: `${CONFIG.PORTAL}/courses`,
	},
};
