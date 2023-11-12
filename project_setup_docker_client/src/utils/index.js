const { Solar } = require('lunar-javascript');

const CAN = ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'];
const CHI = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tí', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];

export default {
    install(Vue) {
        Vue.prototype.$utils = {
            getGender(gender) {
                if (gender === 'male') return 'Nam';
                if (gender === 'female') return 'Nữ';
                return '';
            },
            convertDate(date) {
                // Split the date into an array of [month, day, year]
                const parts = date.split('-');

                // Rearrange the elements in the array to convert from "MM/DD/YYYY" to "DD/MM/YYYY"
                const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

                return formattedDate;
            },
            getLunarDate(date) {
                if (!date) return '';
                const parts = date.split('-');
                const solar = Solar.fromYmd(parts[0], parts[1], parts[2]);
                const day = solar.getLunar().getDay();
                const month = solar.getLunar().getMonth();
                const year = solar.getLunar().getYear();
                const dateNumber = `${day}-${month}-${year} (${this.convertYearLunar(year)})`;
                return dateNumber;
            },
            convertYearLunar(solarYear) {
                if (solarYear < 0) return 'Năm Dương Lịch phải lớn hơn 0';
                if (Number.isNaN(solarYear)) return 'Năm Dương Lịch không đúng định dạng, vui lòng nhập lại';

                let can = 'Không';
                if (solarYear % 10 >= 0 && solarYear % 10 <= 9) {
                    can = CAN[solarYear % 10];
                }

                let chi = 'Biết';
                if (solarYear % 12 >= 0 && solarYear % 12 <= 11) {
                    chi = CHI[solarYear % 12];
                }
                return `${can} ${chi}`;
            },
            getLocation(item) {
                return `${this.formatName(item.ward?.name)} - ${this.formatName(item.district?.name)} - ${this.formatName(item.province?.name)}`;
            },
            reduceDuplicateFeature(features) {
                const reduceFeatures = [];
                features.forEach((feature) => {
                    const isDuplicate = reduceFeatures.some((existingFeature) => existingFeature.id === feature.id);

                    if (!isDuplicate) {
                        reduceFeatures.push(feature);
                    }
                });
                return reduceFeatures;
            },
            capitalizeFirstLetter(string) {
                const stringOut = string.toLowerCase();
                return `${stringOut.charAt(0).toUpperCase()}${stringOut.slice(1)}`;
            },
            formatName(inputString) {
                if (!inputString) {
                    return null;
                }
                const words = inputString.split(' ');
                const capitalizedWords = words.map(this.capitalizeFirstLetter);
                const formattedString = capitalizedWords.join(' ');
                return formattedString;
            },
            checkParamsNotNull(...params) {
                return params.every((param) => param !== null && param !== undefined);
            },

            sendOtherEndArray(array) {
                const indexes = [];
                let newArray = [];

                array.forEach((obj, index) => {
                    if (obj.text === 'Autre' || obj.text === 'Autres') indexes.push(index);
                });

                if (indexes && indexes.length > 0) {
                    indexes.forEach((index) => {
                        array.push(array[index]);
                    });

                    newArray = array.filter((obj, i) => !indexes.includes(i));
                    array = newArray;
                }

                return array;
            },
            mapForSelect(array) {
                return array
                    .filter((el) => el.name)
                    .map((el) => ({
                        text: el.name,
                        value: el.id,
                    }))
                    .sort(
                        (a, b) =>
                            // eslint-disable-next-line implicit-arrow-linebreak
                            a.text.localeCompare(b.text, 'fr', {
                                sensitivity: 'base',
                            }),
                        // eslint-disable-next-line function-paren-newline
                    );
            },
            arrayTrue(array) {
                return array.filter((e) => e.status === true);
            },
            getImgSize(url) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.addEventListener('load', function load() {
                        resolve({
                            width: this.width,
                            height: this.height,
                        });
                    });
                    img.addEventListener('error', (e) => {
                        reject(e);
                    });
                    img.src = url;
                });
            },
            getFullDate(date) {
                let result = null;
                if (date) {
                    result = new Date(date).toLocaleString('fr-Fr');
                    const dayArray = result.split(':');
                    result = `${dayArray[0]}:${dayArray[1]}`;
                }
                return result;
            },
            getDate(date = null) {
                let result;
                if (date) result = new Date(date).toLocaleString('fr-Fr').split(' ')[0];
                else result = null;
                if (result && result[result.length - 1] === ',') result = result.slice(0, result.length - 1);
                return result;
            },
            getToday() {
                let result = new Date().toLocaleString('fr-Fr').split(' ')[0];
                if (result && result[result.length - 1] === ',') result = result.slice(0, result.length - 1);
                return result;
            },
            formatHour(time) {
                if (time && time.length === 4 && time.charAt(1) === ':') time = `0${time}`;
                return time;
            },
            formatDate(date) {
                if (!date) return null;
                const newdate = date.split('-').reverse().join('-');
                return newdate;
            },
            getSecondsFromTime(time) {
                if (time) {
                    const a = time.split(':');
                    if (a.length === 3) {
                        return parseInt(a[0]) * 60 * 60 + parseInt(a[1]) * 60 + parseInt(a[3]);
                    }
                    if (a.length === 2) {
                        return parseInt(a[0]) * 60 * 60 + parseInt(a[1]) * 60;
                    }
                    return 0;
                }
                return 0;
            },
            ucFirst(str) {
                if (str.length > 0) {
                    return str[0].toUpperCase() + str.substring(1);
                }
                return str;
            },
            slugify(str) {
                str = str.replace(/^\s+|\s+$/g, ''); // trim
                str = str.toLowerCase();

                const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
                const to = 'aaaaeeeeiiiioooouuuunc------';
                for (let i = 0, l = from.length; i < l; i++) {
                    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                }

                str = str
                    .replace(/[^a-z0-9 -]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-');

                return str;
            },
            truncate(str, n, useWordBoundary) {
                if (str.length <= n) {
                    return str;
                }
                const subString = str.substr(0, n - 1);
                return `${useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString}...`;
            },
            apiAsset(path) {
                return process.env.VUE_APP_API_URL + path;
            },
            chunkArray(myArray, chunkSize) {
                let index = 0;
                const arrayLength = myArray.length;
                const tempArray = [];

                for (index = 0; index < arrayLength; index += chunkSize) {
                    const myChunk = myArray.slice(index, index + chunkSize);
                    // Do something if you want with the group
                    tempArray.push(myChunk);
                }

                return tempArray;
            },
            swapArrayItems(array, aIndex, bIndex) {
                array[aIndex] = array.splice(bIndex, 1, array[aIndex])[0];
                return array;
            },
            urlBase64ToUint8Array(base64string) {
                const padding = '='.repeat((4 - (base64string.length % 4)) % 4);
                const base64 = (base64string + padding).replace(/-/g, '+').replace(/_/g, '/');

                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);

                for (let i = 0; i < rawData.length; i++) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            },
            arrayUnique(array) {
                const a = array.concat();
                for (let i = 0; i < a.length; ++i) {
                    for (let j = i + 1; j < a.length; ++j) {
                        if (a[i] === a[j]) a.splice(j--, 1);
                    }
                }
                return a;
            },
            getCookie(cname) {
                const name = `${cname}=`;
                const decodedCookie = decodeURIComponent(document.cookie);
                const ca = decodedCookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return '';
            },
            getGeojsonFromFeature(feature) {
                return this.$map.library.ol.format.GeoJSON().writeFeatureObject(feature, {
                    dataProjection: this.$map.projection,
                    featureProjection: 'EPSG:3857',
                }).geometry;
            },
            trustedImgMimes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
            trustedMimeType: [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/svg+xml',
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/msword',
                'application/acad',
                'image/vnd.dwg',
            ],
        };
    },
};
