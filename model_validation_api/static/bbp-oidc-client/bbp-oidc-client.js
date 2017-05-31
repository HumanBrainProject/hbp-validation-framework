;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {
	        function F() {}

	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                F.prototype = this;
	                var subtype = new F();

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init')) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	return CryptoJS;

}));
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex != -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            var words = [];
	            var nBytes = 0;
	            for (var i = 0; i < base64StrLength; i++) {
	                if (i % 4) {
	                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
	                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
	                    var bitsCombined = bits1 | bits2;
	                    words[nBytes >>> 2] |= (bitsCombined) << (24 - (nBytes % 4) * 8);
	                    nBytes++;
	                }
	            }

	            return WordArray.create(words, nBytes);
	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };
	}());


	return CryptoJS.enc.Base64;

}));
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";

function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for(i = 0; i+3 <= h.length; i+=3) {
    c = parseInt(h.substring(i,i+3),16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if(i+1 == h.length) {
    c = parseInt(h.substring(i,i+1),16);
    ret += b64map.charAt(c << 2);
  }
  else if(i+2 == h.length) {
    c = parseInt(h.substring(i,i+2),16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  if (b64pad) while((ret.length & 3) > 0) ret += b64pad;
  return ret;
}

// convert a base64 string to hex
function b64tohex(s) {
  var ret = ""
  var i;
  var k = 0; // b64 state, 0-3
  var slop;
  var v;
  for(i = 0; i < s.length; ++i) {
    if(s.charAt(i) == b64pad) break;
    v = b64map.indexOf(s.charAt(i));
    if(v < 0) continue;
    if(k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    }
    else if(k == 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    }
    else if(k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    }
    else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if(k == 1)
    ret += int2char(slop << 2);
  return ret;
}

// convert a base64 string to a byte/number array
function b64toBA(s) {
  //piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = new Array();
  for(i = 0; 2*i < h.length; ++i) {
    a[i] = parseInt(h.substring(2*i,2*i+2),16);
  }
  return a;
}

/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if(a != null)
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+this.DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      this[this.t++] = x;
    else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    }
    else
      this[this.t-1] |= x<<sh;
    sh += k;
    if(sh >= this.DB) sh -= this.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
  }
  this.clamp();
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  if(this.s < 0) return "-"+this.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return (this.s<0)?-r:r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = this.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) this.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y);	// "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;		// y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)	// pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
function parseBigInt(str,r) {
  return new BigInteger(str,r);
}

function linebrk(s,n) {
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
  if(b < 0x10)
    return "0" + b.toString(16);
  else
    return b.toString(16);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
  if(n < s.length + 11) { // TODO: fix for utf-8
    alert("Message too long for RSA");
    return null;
  }
  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if(c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Array();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

// PKCS#1 (OAEP) mask generation function
function oaep_mgf1_arr(seed, len, hash)
{
    var mask = '', i = 0;

    while (mask.length < len)
    {
        mask += hash(String.fromCharCode.apply(String, seed.concat([
                (i & 0xff000000) >> 24,
                (i & 0x00ff0000) >> 16,
                (i & 0x0000ff00) >> 8,
                i & 0x000000ff])));
        i += 1;
    }

    return mask;
}

var SHA1_SIZE = 20;

// PKCS#1 (OAEP) pad input string s to n bytes, and return a bigint
function oaep_pad(s, n, hash)
{
    if (s.length + 2 * SHA1_SIZE + 2 > n)
    {
        throw "Message too long for RSA";
    }

    var PS = '', i;

    for (i = 0; i < n - s.length - 2 * SHA1_SIZE - 2; i += 1)
    {
        PS += '\x00';
    }

    var DB = rstr_sha1('') + PS + '\x01' + s;
    var seed = new Array(SHA1_SIZE);
    new SecureRandom().nextBytes(seed);
    
    var dbMask = oaep_mgf1_arr(seed, DB.length, hash || rstr_sha1);
    var maskedDB = [];

    for (i = 0; i < DB.length; i += 1)
    {
        maskedDB[i] = DB.charCodeAt(i) ^ dbMask.charCodeAt(i);
    }

    var seedMask = oaep_mgf1_arr(maskedDB, seed.length, rstr_sha1);
    var maskedSeed = [0];

    for (i = 0; i < seed.length; i += 1)
    {
        maskedSeed[i + 1] = seed[i] ^ seedMask.charCodeAt(i);
    }

    return new BigInteger(maskedSeed.concat(maskedDB));
}

// "empty" RSA key constructor
function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
  this.isPublic = true;
  if (typeof N !== "string") 
  {
    this.n = N;
    this.e = E;
  }
  else if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
  }
  else
    alert("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var h = c.toString(16);
  if((h.length & 1) == 0) return h; else return "0" + h;
}

// Return the PKCS#1 OAEP RSA encryption of "text" as an even-length hex string
function RSAEncryptOAEP(text, hash) {
  var m = oaep_pad(text, (this.n.bitLength()+7)>>3, hash);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var h = c.toString(16);
  if((h.length & 1) == 0) return h; else return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.encryptOAEP = RSAEncryptOAEP;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

RSAKey.prototype.type = "RSA";

/*! rsasign-1.2.7.js (c) 2012 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
/*
 * rsa-sign.js - adding signing functions to RSAKey class.
 *
 * version: 1.2.7 (2013 Aug 25)
 *
 * Copyright (c) 2010-2013 Kenji Urushima (kenji.urushima@gmail.com)
 *
 * This software is licensed under the terms of the MIT License.
 * http://kjur.github.com/jsrsasign/license/
 *
 * The above copyright and license notice shall be 
 * included in all copies or substantial portions of the Software.
 */

/**
 * @fileOverview
 * @name rsasign-1.2.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version rsasign 1.2.7
 * @license <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
 */

var _RE_HEXDECONLY = new RegExp("");
_RE_HEXDECONLY.compile("[^0-9a-f]", "gi");

// ========================================================================
// Signature Generation
// ========================================================================

function _rsasign_getHexPaddedDigestInfoForString(s, keySize, hashAlg) {
    var hashFunc = function(s) { return KJUR.crypto.Util.hashString(s, hashAlg); };
    var sHashHex = hashFunc(s);

    return KJUR.crypto.Util.getPaddedDigestInfoHex(sHashHex, hashAlg, keySize);
}

function _zeroPaddingOfSignature(hex, bitLength) {
    var s = "";
    var nZero = bitLength / 4 - hex.length;
    for (var i = 0; i < nZero; i++) {
	s = s + "0";
    }
    return s + hex;
}

/**
 * sign for a message string with RSA private key.<br/>
 * @name signString
 * @memberOf RSAKey
 * @function
 * @param {String} s message string to be signed.
 * @param {String} hashAlg hash algorithm name for signing.<br/>
 * @return returns hexadecimal string of signature value.
 */
function _rsasign_signString(s, hashAlg) {
    var hashFunc = function(s) { return KJUR.crypto.Util.hashString(s, hashAlg); };
    var sHashHex = hashFunc(s);

    return this.signWithMessageHash(sHashHex, hashAlg);
}

/**
 * sign hash value of message to be signed with RSA private key.<br/>
 * @name signWithMessageHash
 * @memberOf RSAKey
 * @function
 * @param {String} sHashHex hexadecimal string of hash value of message to be signed.
 * @param {String} hashAlg hash algorithm name for signing.<br/>
 * @return returns hexadecimal string of signature value.
 * @since rsasign 1.2.6
 */
function _rsasign_signWithMessageHash(sHashHex, hashAlg) {
    var hPM = KJUR.crypto.Util.getPaddedDigestInfoHex(sHashHex, hashAlg, this.n.bitLength());
    var biPaddedMessage = parseBigInt(hPM, 16);
    var biSign = this.doPrivate(biPaddedMessage);
    var hexSign = biSign.toString(16);
    return _zeroPaddingOfSignature(hexSign, this.n.bitLength());
}

function _rsasign_signStringWithSHA1(s) {
    return _rsasign_signString.call(this, s, 'sha1');
}

function _rsasign_signStringWithSHA256(s) {
    return _rsasign_signString.call(this, s, 'sha256');
}

// PKCS#1 (PSS) mask generation function
function pss_mgf1_str(seed, len, hash) {
    var mask = '', i = 0;

    while (mask.length < len) {
        mask += hextorstr(hash(rstrtohex(seed + String.fromCharCode.apply(String, [
                (i & 0xff000000) >> 24,
                (i & 0x00ff0000) >> 16,
                (i & 0x0000ff00) >> 8,
                i & 0x000000ff]))));
        i += 1;
    }

    return mask;
}

/**
 * sign for a message string with RSA private key by PKCS#1 PSS signing.<br/>
 * @name signStringPSS
 * @memberOf RSAKey
 * @function
 * @param {String} s message string to be signed.
 * @param {String} hashAlg hash algorithm name for signing.
 * @param {Integer} sLen salt byte length from 0 to (keybytelen - hashbytelen - 2).
 *        There are two special values:
 *        <ul>
 *        <li>-1: sets the salt length to the digest length</li>
 *        <li>-2: sets the salt length to maximum permissible value
 *           (i.e. keybytelen - hashbytelen - 2)</li>
 *        </ul>
 *        DEFAULT is -1. (NOTE: OpenSSL's default is -2.)
 * @return returns hexadecimal string of signature value.
 */
function _rsasign_signStringPSS(s, hashAlg, sLen) {
    var hashFunc = function(sHex) { return KJUR.crypto.Util.hashHex(sHex, hashAlg); } 
    var hHash = hashFunc(rstrtohex(s));

    if (sLen === undefined) sLen = -1;
    return this.signWithMessageHashPSS(hHash, hashAlg, sLen);
}

/**
 * sign hash value of message with RSA private key by PKCS#1 PSS signing.<br/>
 * @name signWithMessageHashPSS
 * @memberOf RSAKey
 * @function
 * @param {String} hHash hexadecimal hash value of message to be signed.
 * @param {String} hashAlg hash algorithm name for signing.
 * @param {Integer} sLen salt byte length from 0 to (keybytelen - hashbytelen - 2).
 *        There are two special values:
 *        <ul>
 *        <li>-1: sets the salt length to the digest length</li>
 *        <li>-2: sets the salt length to maximum permissible value
 *           (i.e. keybytelen - hashbytelen - 2)</li>
 *        </ul>
 *        DEFAULT is -1. (NOTE: OpenSSL's default is -2.)
 * @return returns hexadecimal string of signature value.
 * @since rsasign 1.2.6
 */
function _rsasign_signWithMessageHashPSS(hHash, hashAlg, sLen) {
    var mHash = hextorstr(hHash);
    var hLen = mHash.length;
    var emBits = this.n.bitLength() - 1;
    var emLen = Math.ceil(emBits / 8);
    var i;
    var hashFunc = function(sHex) { return KJUR.crypto.Util.hashHex(sHex, hashAlg); } 

    if (sLen === -1 || sLen === undefined) {
        sLen = hLen; // same as hash length
    } else if (sLen === -2) {
        sLen = emLen - hLen - 2; // maximum
    } else if (sLen < -2) {
        throw "invalid salt length";
    }

    if (emLen < (hLen + sLen + 2)) {
        throw "data too long";
    }

    var salt = '';

    if (sLen > 0) {
        salt = new Array(sLen);
        new SecureRandom().nextBytes(salt);
        salt = String.fromCharCode.apply(String, salt);
    }

    var H = hextorstr(hashFunc(rstrtohex('\x00\x00\x00\x00\x00\x00\x00\x00' + mHash + salt)));
    var PS = [];

    for (i = 0; i < emLen - sLen - hLen - 2; i += 1) {
        PS[i] = 0x00;
    }

    var DB = String.fromCharCode.apply(String, PS) + '\x01' + salt;
    var dbMask = pss_mgf1_str(H, DB.length, hashFunc);
    var maskedDB = [];

    for (i = 0; i < DB.length; i += 1) {
        maskedDB[i] = DB.charCodeAt(i) ^ dbMask.charCodeAt(i);
    }

    var mask = (0xff00 >> (8 * emLen - emBits)) & 0xff;
    maskedDB[0] &= ~mask;

    for (i = 0; i < hLen; i++) {
        maskedDB.push(H.charCodeAt(i));
    }

    maskedDB.push(0xbc);

    return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(maskedDB)).toString(16),
				   this.n.bitLength());
}

// ========================================================================
// Signature Verification
// ========================================================================

function _rsasign_getDecryptSignatureBI(biSig, hN, hE) {
    var rsa = new RSAKey();
    rsa.setPublic(hN, hE);
    var biDecryptedSig = rsa.doPublic(biSig);
    return biDecryptedSig;
}

function _rsasign_getHexDigestInfoFromSig(biSig, hN, hE) {
    var biDecryptedSig = _rsasign_getDecryptSignatureBI(biSig, hN, hE);
    var hDigestInfo = biDecryptedSig.toString(16).replace(/^1f+00/, '');
    return hDigestInfo;
}

function _rsasign_getAlgNameAndHashFromHexDisgestInfo(hDigestInfo) {
    for (var algName in KJUR.crypto.Util.DIGESTINFOHEAD) {
	var head = KJUR.crypto.Util.DIGESTINFOHEAD[algName];
	var len = head.length;
	if (hDigestInfo.substring(0, len) == head) {
	    var a = [algName, hDigestInfo.substring(len)];
	    return a;
	}
    }
    return [];
}

function _rsasign_verifySignatureWithArgs(sMsg, biSig, hN, hE) {
    var hDigestInfo = _rsasign_getHexDigestInfoFromSig(biSig, hN, hE);
    var digestInfoAry = _rsasign_getAlgNameAndHashFromHexDisgestInfo(hDigestInfo);
    if (digestInfoAry.length == 0) return false;
    var algName = digestInfoAry[0];
    var diHashValue = digestInfoAry[1];
    var ff = function(s) { return KJUR.crypto.Util.hashString(s, algName); };
    var msgHashValue = ff(sMsg);
    return (diHashValue == msgHashValue);
}

function _rsasign_verifyHexSignatureForMessage(hSig, sMsg) {
    var biSig = parseBigInt(hSig, 16);
    var result = _rsasign_verifySignatureWithArgs(sMsg, biSig,
						  this.n.toString(16),
						  this.e.toString(16));
    return result;
}

/**
 * verifies a sigature for a message string with RSA public key.<br/>
 * @name verifyString
 * @memberOf RSAKey#
 * @function
 * @param {String} sMsg message string to be verified.
 * @param {String} hSig hexadecimal string of siganture.<br/>
 *                 non-hexadecimal charactors including new lines will be ignored.
 * @return returns 1 if valid, otherwise 0
 */
function _rsasign_verifyString(sMsg, hSig) {
    hSig = hSig.replace(_RE_HEXDECONLY, '');
    hSig = hSig.replace(/[ \n]+/g, "");
    var biSig = parseBigInt(hSig, 16);
    if (biSig.bitLength() > this.n.bitLength()) return 0;
    var biDecryptedSig = this.doPublic(biSig);
    var hDigestInfo = biDecryptedSig.toString(16).replace(/^1f+00/, '');
    var digestInfoAry = _rsasign_getAlgNameAndHashFromHexDisgestInfo(hDigestInfo);
  
    if (digestInfoAry.length == 0) return false;
    var algName = digestInfoAry[0];
    var diHashValue = digestInfoAry[1];
    var ff = function(s) { return KJUR.crypto.Util.hashString(s, algName); };
    var msgHashValue = ff(sMsg);
    return (diHashValue == msgHashValue);
}

/**
 * verifies a sigature for a message string with RSA public key.<br/>
 * @name verifyWithMessageHash
 * @memberOf RSAKey
 * @function
 * @param {String} sHashHex hexadecimal hash value of message to be verified.
 * @param {String} hSig hexadecimal string of siganture.<br/>
 *                 non-hexadecimal charactors including new lines will be ignored.
 * @return returns 1 if valid, otherwise 0
 * @since rsasign 1.2.6
 */
function _rsasign_verifyWithMessageHash(sHashHex, hSig) {
    hSig = hSig.replace(_RE_HEXDECONLY, '');
    hSig = hSig.replace(/[ \n]+/g, "");
    var biSig = parseBigInt(hSig, 16);
    if (biSig.bitLength() > this.n.bitLength()) return 0;
    var biDecryptedSig = this.doPublic(biSig);
    var hDigestInfo = biDecryptedSig.toString(16).replace(/^1f+00/, '');
    var digestInfoAry = _rsasign_getAlgNameAndHashFromHexDisgestInfo(hDigestInfo);
  
    if (digestInfoAry.length == 0) return false;
    var algName = digestInfoAry[0];
    var diHashValue = digestInfoAry[1];
    return (diHashValue == sHashHex);
}

/**
 * verifies a sigature for a message string with RSA public key by PKCS#1 PSS sign.<br/>
 * @name verifyStringPSS
 * @memberOf RSAKey
 * @function
 * @param {String} sMsg message string to be verified.
 * @param {String} hSig hexadecimal string of signature value
 * @param {String} hashAlg hash algorithm name
 * @param {Integer} sLen salt byte length from 0 to (keybytelen - hashbytelen - 2).
 *        There are two special values:
 *        <ul>
 *        <li>-1: sets the salt length to the digest length</li>
 *        <li>-2: sets the salt length to maximum permissible value
 *           (i.e. keybytelen - hashbytelen - 2)</li>
 *        </ul>
 *        DEFAULT is -1. (NOTE: OpenSSL's default is -2.)
 * @return returns true if valid, otherwise false
 */
function _rsasign_verifyStringPSS(sMsg, hSig, hashAlg, sLen) {
    var hashFunc = function(sHex) { return KJUR.crypto.Util.hashHex(sHex, hashAlg); };
    var hHash = hashFunc(rstrtohex(sMsg));

    if (sLen === undefined) sLen = -1;
    return this.verifyWithMessageHashPSS(hHash, hSig, hashAlg, sLen);
}

/**
 * verifies a sigature for a hash value of message string with RSA public key by PKCS#1 PSS sign.<br/>
 * @name verifyWithMessageHashPSS
 * @memberOf RSAKey
 * @function
 * @param {String} hHash hexadecimal hash value of message string to be verified.
 * @param {String} hSig hexadecimal string of signature value
 * @param {String} hashAlg hash algorithm name
 * @param {Integer} sLen salt byte length from 0 to (keybytelen - hashbytelen - 2).
 *        There are two special values:
 *        <ul>
 *        <li>-1: sets the salt length to the digest length</li>
 *        <li>-2: sets the salt length to maximum permissible value
 *           (i.e. keybytelen - hashbytelen - 2)</li>
 *        </ul>
 *        DEFAULT is -1 (NOTE: OpenSSL's default is -2.)
 * @return returns true if valid, otherwise false
 * @since rsasign 1.2.6
 */
function _rsasign_verifyWithMessageHashPSS(hHash, hSig, hashAlg, sLen) {
    var biSig = new BigInteger(hSig, 16);

    if (biSig.bitLength() > this.n.bitLength()) {
        return false;
    }

    var hashFunc = function(sHex) { return KJUR.crypto.Util.hashHex(sHex, hashAlg); };
    var mHash = hextorstr(hHash);
    var hLen = mHash.length;
    var emBits = this.n.bitLength() - 1;
    var emLen = Math.ceil(emBits / 8);
    var i;

    if (sLen === -1 || sLen === undefined) {
        sLen = hLen; // same as hash length
    } else if (sLen === -2) {
        sLen = emLen - hLen - 2; // recover
    } else if (sLen < -2) {
        throw "invalid salt length";
    }

    if (emLen < (hLen + sLen + 2)) {
        throw "data too long";
    }

    var em = this.doPublic(biSig).toByteArray();

    for (i = 0; i < em.length; i += 1) {
        em[i] &= 0xff;
    }

    while (em.length < emLen) {
        em.unshift(0);
    }

    if (em[emLen -1] !== 0xbc) {
        throw "encoded message does not end in 0xbc";
    }

    em = String.fromCharCode.apply(String, em);

    var maskedDB = em.substr(0, emLen - hLen - 1);
    var H = em.substr(maskedDB.length, hLen);

    var mask = (0xff00 >> (8 * emLen - emBits)) & 0xff;

    if ((maskedDB.charCodeAt(0) & mask) !== 0) {
        throw "bits beyond keysize not zero";
    }

    var dbMask = pss_mgf1_str(H, maskedDB.length, hashFunc);
    var DB = [];

    for (i = 0; i < maskedDB.length; i += 1) {
        DB[i] = maskedDB.charCodeAt(i) ^ dbMask.charCodeAt(i);
    }

    DB[0] &= ~mask;

    var checkLen = emLen - hLen - sLen - 2;

    for (i = 0; i < checkLen; i += 1) {
        if (DB[i] !== 0x00) {
            throw "leftmost octets not zero";
        }
    }

    if (DB[checkLen] !== 0x01) {
        throw "0x01 marker not found";
    }

    return H === hextorstr(hashFunc(rstrtohex('\x00\x00\x00\x00\x00\x00\x00\x00' + mHash +
				     String.fromCharCode.apply(String, DB.slice(-sLen)))));
}

RSAKey.prototype.signWithMessageHash = _rsasign_signWithMessageHash;
RSAKey.prototype.signString = _rsasign_signString;
RSAKey.prototype.signStringWithSHA1 = _rsasign_signStringWithSHA1;
RSAKey.prototype.signStringWithSHA256 = _rsasign_signStringWithSHA256;
RSAKey.prototype.sign = _rsasign_signString;
RSAKey.prototype.signWithSHA1 = _rsasign_signStringWithSHA1;
RSAKey.prototype.signWithSHA256 = _rsasign_signStringWithSHA256;

RSAKey.prototype.signWithMessageHashPSS = _rsasign_signWithMessageHashPSS;
RSAKey.prototype.signStringPSS = _rsasign_signStringPSS;
RSAKey.prototype.signPSS = _rsasign_signStringPSS;
RSAKey.SALT_LEN_HLEN = -1;
RSAKey.SALT_LEN_MAX = -2;

RSAKey.prototype.verifyWithMessageHash = _rsasign_verifyWithMessageHash;
RSAKey.prototype.verifyString = _rsasign_verifyString;
RSAKey.prototype.verifyHexSignatureForMessage = _rsasign_verifyHexSignatureForMessage;
RSAKey.prototype.verify = _rsasign_verifyString;
RSAKey.prototype.verifyHexSignatureForByteArrayMessage = _rsasign_verifyHexSignatureForMessage;

RSAKey.prototype.verifyWithMessageHashPSS = _rsasign_verifyWithMessageHashPSS;
RSAKey.prototype.verifyStringPSS = _rsasign_verifyStringPSS;
RSAKey.prototype.verifyPSS = _rsasign_verifyStringPSS;
RSAKey.SALT_LEN_RECOVER = -2;

/**
 * @name RSAKey
 * @class key of RSA public key algorithm
 * @description Tom Wu's RSA Key class and extension
 */

/*! crypto-1.1.5.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
/*
 * crypto.js - Cryptographic Algorithm Provider class
 *
 * Copyright (c) 2013 Kenji Urushima (kenji.urushima@gmail.com)
 *
 * This software is licensed under the terms of the MIT License.
 * http://kjur.github.com/jsrsasign/license
 *
 * The above copyright and license notice shall be 
 * included in all copies or substantial portions of the Software.
 */

/**
 * @fileOverview
 * @name crypto-1.1.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version 1.1.5 (2013-Oct-06)
 * @since jsrsasign 2.2
 * @license <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
 */

/** 
 * kjur's class library name space
 * @name KJUR
 * @namespace kjur's class library name space
 */
if (typeof KJUR == "undefined" || !KJUR) window.KJUR = {};
/**
 * kjur's cryptographic algorithm provider library name space
 * <p>
 * This namespace privides following crytpgrahic classes.
 * <ul>
 * <li>{@link KJUR.crypto.MessageDigest} - Java JCE(cryptograhic extension) style MessageDigest class</li>
 * <li>{@link KJUR.crypto.Signature} - Java JCE(cryptograhic extension) style Signature class</li>
 * <li>{@link KJUR.crypto.Util} - cryptographic utility functions and properties</li>
 * </ul>
 * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
 * </p>
 * @name KJUR.crypto
 * @namespace
 */
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) KJUR.crypto = {};

/**
 * static object for cryptographic function utilities
 * @name KJUR.crypto.Util
 * @class static object for cryptographic function utilities
 * @property {Array} DIGESTINFOHEAD PKCS#1 DigestInfo heading hexadecimal bytes for each hash algorithms
 * @property {Array} DEFAULTPROVIDER associative array of default provider name for each hash and signature algorithms
 * @description
 */
KJUR.crypto.Util = new function() {
    this.DIGESTINFOHEAD = {
	'sha1':      "3021300906052b0e03021a05000414",
        'sha224':    "302d300d06096086480165030402040500041c",
	'sha256':    "3031300d060960864801650304020105000420",
	'sha384':    "3041300d060960864801650304020205000430",
	'sha512':    "3051300d060960864801650304020305000440",
	'md2':       "3020300c06082a864886f70d020205000410",
	'md5':       "3020300c06082a864886f70d020505000410",
	'ripemd160': "3021300906052b2403020105000414",
    };

    /*
     * @since crypto 1.1.1
     */
    this.DEFAULTPROVIDER = {
	'md5':			'cryptojs',
	'sha1':			'cryptojs',
	'sha224':		'cryptojs',
	'sha256':		'cryptojs',
	'sha384':		'cryptojs',
	'sha512':		'cryptojs',
	'ripemd160':		'cryptojs',
	'hmacmd5':		'cryptojs',
	'hmacsha1':		'cryptojs',
	'hmacsha224':		'cryptojs',
	'hmacsha256':		'cryptojs',
	'hmacsha384':		'cryptojs',
	'hmacsha512':		'cryptojs',
	'hmacripemd160':	'cryptojs',

	'MD5withRSA':		'cryptojs/jsrsa',
	'SHA1withRSA':		'cryptojs/jsrsa',
	'SHA224withRSA':	'cryptojs/jsrsa',
	'SHA256withRSA':	'cryptojs/jsrsa',
	'SHA384withRSA':	'cryptojs/jsrsa',
	'SHA512withRSA':	'cryptojs/jsrsa',
	'RIPEMD160withRSA':	'cryptojs/jsrsa',

	'MD5withECDSA':		'cryptojs/jsrsa',
	'SHA1withECDSA':	'cryptojs/jsrsa',
	'SHA224withECDSA':	'cryptojs/jsrsa',
	'SHA256withECDSA':	'cryptojs/jsrsa',
	'SHA384withECDSA':	'cryptojs/jsrsa',
	'SHA512withECDSA':	'cryptojs/jsrsa',
	'RIPEMD160withECDSA':	'cryptojs/jsrsa',

	'SHA1withDSA':		'cryptojs/jsrsa',
	'SHA224withDSA':	'cryptojs/jsrsa',
	'SHA256withDSA':	'cryptojs/jsrsa',

	'MD5withRSAandMGF1':		'cryptojs/jsrsa',
	'SHA1withRSAandMGF1':		'cryptojs/jsrsa',
	'SHA224withRSAandMGF1':		'cryptojs/jsrsa',
	'SHA256withRSAandMGF1':		'cryptojs/jsrsa',
	'SHA384withRSAandMGF1':		'cryptojs/jsrsa',
	'SHA512withRSAandMGF1':		'cryptojs/jsrsa',
	'RIPEMD160withRSAandMGF1':	'cryptojs/jsrsa',
    };

    /*
     * @since crypto 1.1.2
     */
    this.CRYPTOJSMESSAGEDIGESTNAME = {
	'md5':		'CryptoJS.algo.MD5',
	'sha1':		'CryptoJS.algo.SHA1',
	'sha224':	'CryptoJS.algo.SHA224',
	'sha256':	'CryptoJS.algo.SHA256',
	'sha384':	'CryptoJS.algo.SHA384',
	'sha512':	'CryptoJS.algo.SHA512',
	'ripemd160':	'CryptoJS.algo.RIPEMD160'
    };

    /**
     * get hexadecimal DigestInfo
     * @name getDigestInfoHex
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} hHash hexadecimal hash value
     * @param {String} alg hash algorithm name (ex. 'sha1')
     * @return {String} hexadecimal string DigestInfo ASN.1 structure
     */
    this.getDigestInfoHex = function(hHash, alg) {
	if (typeof this.DIGESTINFOHEAD[alg] == "undefined")
	    throw "alg not supported in Util.DIGESTINFOHEAD: " + alg;
	return this.DIGESTINFOHEAD[alg] + hHash;
    };

    /**
     * get PKCS#1 padded hexadecimal DigestInfo
     * @name getPaddedDigestInfoHex
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} hHash hexadecimal hash value of message to be signed
     * @param {String} alg hash algorithm name (ex. 'sha1')
     * @param {Integer} keySize key bit length (ex. 1024)
     * @return {String} hexadecimal string of PKCS#1 padded DigestInfo
     */
    this.getPaddedDigestInfoHex = function(hHash, alg, keySize) {
	var hDigestInfo = this.getDigestInfoHex(hHash, alg);
	var pmStrLen = keySize / 4; // minimum PM length

	if (hDigestInfo.length + 22 > pmStrLen) // len(0001+ff(*8)+00+hDigestInfo)=22
	    throw "key is too short for SigAlg: keylen=" + keySize + "," + alg;

	var hHead = "0001";
	var hTail = "00" + hDigestInfo;
	var hMid = "";
	var fLen = pmStrLen - hHead.length - hTail.length;
	for (var i = 0; i < fLen; i += 2) {
	    hMid += "ff";
	}
	var hPaddedMessage = hHead + hMid + hTail;
	return hPaddedMessage;
    };

    /**
     * get hexadecimal hash of string with specified algorithm
     * @name hashString
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} s input string to be hashed
     * @param {String} alg hash algorithm name
     * @return {String} hexadecimal string of hash value
     * @since 1.1.1
     */
    this.hashString = function(s, alg) {
        var md = new KJUR.crypto.MessageDigest({'alg': alg});
        return md.digestString(s);
    };

    /**
     * get hexadecimal hash of hexadecimal string with specified algorithm
     * @name hashHex
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} sHex input hexadecimal string to be hashed
     * @param {String} alg hash algorithm name
     * @return {String} hexadecimal string of hash value
     * @since 1.1.1
     */
    this.hashHex = function(sHex, alg) {
        var md = new KJUR.crypto.MessageDigest({'alg': alg});
        return md.digestHex(sHex);
    };

    /**
     * get hexadecimal SHA1 hash of string
     * @name sha1
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} s input string to be hashed
     * @return {String} hexadecimal string of hash value
     * @since 1.0.3
     */
    this.sha1 = function(s) {
        var md = new KJUR.crypto.MessageDigest({'alg':'sha1', 'prov':'cryptojs'});
        return md.digestString(s);
    };

    /**
     * get hexadecimal SHA256 hash of string
     * @name sha256
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} s input string to be hashed
     * @return {String} hexadecimal string of hash value
     * @since 1.0.3
     */
    this.sha256 = function(s) {
        var md = new KJUR.crypto.MessageDigest({'alg':'sha256', 'prov':'cryptojs'});
        return md.digestString(s);
    };

    this.sha256Hex = function(s) {
        var md = new KJUR.crypto.MessageDigest({'alg':'sha256', 'prov':'cryptojs'});
        return md.digestHex(s);
    };

    /**
     * get hexadecimal SHA512 hash of string
     * @name sha512
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} s input string to be hashed
     * @return {String} hexadecimal string of hash value
     * @since 1.0.3
     */
    this.sha512 = function(s) {
        var md = new KJUR.crypto.MessageDigest({'alg':'sha512', 'prov':'cryptojs'});
        return md.digestString(s);
    };

    this.sha512Hex = function(s) {
        var md = new KJUR.crypto.MessageDigest({'alg':'sha512', 'prov':'cryptojs'});
        return md.digestHex(s);
    };

    /**
     * get hexadecimal MD5 hash of string
     * @name md5
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} s input string to be hashed
     * @return {String} hexadecimal string of hash value
     * @since 1.0.3
     */
    this.md5 = function(s) {
        var md = new KJUR.crypto.MessageDigest({'alg':'md5', 'prov':'cryptojs'});
        return md.digestString(s);
    };

    /**
     * get hexadecimal RIPEMD160 hash of string
     * @name ripemd160
     * @memberOf KJUR.crypto.Util
     * @function
     * @param {String} s input string to be hashed
     * @return {String} hexadecimal string of hash value
     * @since 1.0.3
     */
    this.ripemd160 = function(s) {
        var md = new KJUR.crypto.MessageDigest({'alg':'ripemd160', 'prov':'cryptojs'});
        return md.digestString(s);
    };

    /*
     * @since 1.1.2
     */
    this.getCryptoJSMDByName = function(s) {
	
    };
};

/**
 * MessageDigest class which is very similar to java.security.MessageDigest class
 * @name KJUR.crypto.MessageDigest
 * @class MessageDigest class which is very similar to java.security.MessageDigest class
 * @param {Array} params parameters for constructor
 * @description
 * <br/>
 * Currently this supports following algorithm and providers combination:
 * <ul>
 * <li>md5 - cryptojs</li>
 * <li>sha1 - cryptojs</li>
 * <li>sha224 - cryptojs</li>
 * <li>sha256 - cryptojs</li>
 * <li>sha384 - cryptojs</li>
 * <li>sha512 - cryptojs</li>
 * <li>ripemd160 - cryptojs</li>
 * <li>sha256 - sjcl (NEW from crypto.js 1.0.4)</li>
 * </ul>
 * @example
 * // CryptoJS provider sample
 * &lt;script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/core.js"&gt;&lt;/script&gt;
 * &lt;script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/sha1.js"&gt;&lt;/script&gt;
 * &lt;script src="crypto-1.0.js"&gt;&lt;/script&gt;
 * var md = new KJUR.crypto.MessageDigest({alg: "sha1", prov: "cryptojs"});
 * md.updateString('aaa')
 * var mdHex = md.digest()
 *
 * // SJCL(Stanford JavaScript Crypto Library) provider sample
 * &lt;script src="http://bitwiseshiftleft.github.io/sjcl/sjcl.js"&gt;&lt;/script&gt;
 * &lt;script src="crypto-1.0.js"&gt;&lt;/script&gt;
 * var md = new KJUR.crypto.MessageDigest({alg: "sha256", prov: "sjcl"}); // sjcl supports sha256 only
 * md.updateString('aaa')
 * var mdHex = md.digest()
 */
KJUR.crypto.MessageDigest = function(params) {
    var md = null;
    var algName = null;
    var provName = null;

    /**
     * set hash algorithm and provider
     * @name setAlgAndProvider
     * @memberOf KJUR.crypto.MessageDigest
     * @function
     * @param {String} alg hash algorithm name
     * @param {String} prov provider name
     * @description
     * @example
     * // for SHA1
     * md.setAlgAndProvider('sha1', 'cryptojs');
     * // for RIPEMD160
     * md.setAlgAndProvider('ripemd160', 'cryptojs');
     */
    this.setAlgAndProvider = function(alg, prov) {
	if (alg != null && prov === undefined) prov = KJUR.crypto.Util.DEFAULTPROVIDER[alg];

	// for cryptojs
	if (':md5:sha1:sha224:sha256:sha384:sha512:ripemd160:'.indexOf(alg) != -1 &&
	    prov == 'cryptojs') {
	    try {
		this.md = eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[alg]).create();
	    } catch (ex) {
		throw "setAlgAndProvider hash alg set fail alg=" + alg + "/" + ex;
	    }
	    this.updateString = function(str) {
		this.md.update(str);
	    };
	    this.updateHex = function(hex) {
		var wHex = CryptoJS.enc.Hex.parse(hex);
		this.md.update(wHex);
	    };
	    this.digest = function() {
		var hash = this.md.finalize();
		return hash.toString(CryptoJS.enc.Hex);
	    };
	    this.digestString = function(str) {
		this.updateString(str);
		return this.digest();
	    };
	    this.digestHex = function(hex) {
		this.updateHex(hex);
		return this.digest();
	    };
	}
	if (':sha256:'.indexOf(alg) != -1 &&
	    prov == 'sjcl') {
	    try {
		this.md = new sjcl.hash.sha256();
	    } catch (ex) {
		throw "setAlgAndProvider hash alg set fail alg=" + alg + "/" + ex;
	    }
	    this.updateString = function(str) {
		this.md.update(str);
	    };
	    this.updateHex = function(hex) {
		var baHex = sjcl.codec.hex.toBits(hex);
		this.md.update(baHex);
	    };
	    this.digest = function() {
		var hash = this.md.finalize();
		return sjcl.codec.hex.fromBits(hash);
	    };
	    this.digestString = function(str) {
		this.updateString(str);
		return this.digest();
	    };
	    this.digestHex = function(hex) {
		this.updateHex(hex);
		return this.digest();
	    };
	}
    };

    /**
     * update digest by specified string
     * @name updateString
     * @memberOf KJUR.crypto.MessageDigest
     * @function
     * @param {String} str string to update
     * @description
     * @example
     * md.updateString('New York');
     */
    this.updateString = function(str) {
	throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };

    /**
     * update digest by specified hexadecimal string
     * @name updateHex
     * @memberOf KJUR.crypto.MessageDigest
     * @function
     * @param {String} hex hexadecimal string to update
     * @description
     * @example
     * md.updateHex('0afe36');
     */
    this.updateHex = function(hex) {
	throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };

    /**
     * completes hash calculation and returns hash result
     * @name digest
     * @memberOf KJUR.crypto.MessageDigest
     * @function
     * @description
     * @example
     * md.digest()
     */
    this.digest = function() {
	throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };

    /**
     * performs final update on the digest using string, then completes the digest computation
     * @name digestString
     * @memberOf KJUR.crypto.MessageDigest
     * @function
     * @param {String} str string to final update
     * @description
     * @example
     * md.digestString('aaa')
     */
    this.digestString = function(str) {
	throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };

    /**
     * performs final update on the digest using hexadecimal string, then completes the digest computation
     * @name digestHex
     * @memberOf KJUR.crypto.MessageDigest
     * @function
     * @param {String} hex hexadecimal string to final update
     * @description
     * @example
     * md.digestHex('0f2abd')
     */
    this.digestHex = function(hex) {
	throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };

    if (params !== undefined) {
	if (params['alg'] !== undefined) {
	    this.algName = params['alg'];
	    if (params['prov'] === undefined)
		this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
	    this.setAlgAndProvider(this.algName, this.provName);
	}
    }
};

/**
 * Mac(Message Authentication Code) class which is very similar to java.security.Mac class 
 * @name KJUR.crypto.Mac
 * @class Mac class which is very similar to java.security.Mac class
 * @param {Array} params parameters for constructor
 * @description
 * <br/>
 * Currently this supports following algorithm and providers combination:
 * <ul>
 * <li>hmacmd5 - cryptojs</li>
 * <li>hmacsha1 - cryptojs</li>
 * <li>hmacsha224 - cryptojs</li>
 * <li>hmacsha256 - cryptojs</li>
 * <li>hmacsha384 - cryptojs</li>
 * <li>hmacsha512 - cryptojs</li>
 * </ul>
 * NOTE: HmacSHA224 and HmacSHA384 issue was fixed since jsrsasign 4.1.4.
 * Please use 'ext/cryptojs-312-core-fix*.js' instead of 'core.js' of original CryptoJS
 * to avoid those issue.
 * @example
 * var mac = new KJUR.crypto.Mac({alg: "HmacSHA1", prov: "cryptojs", "pass": "pass"});
 * mac.updateString('aaa')
 * var macHex = md.doFinal()
 */
KJUR.crypto.Mac = function(params) {
    var mac = null;
    var pass = null;
    var algName = null;
    var provName = null;
    var algProv = null;

    this.setAlgAndProvider = function(alg, prov) {
	if (alg == null) alg = "hmacsha1";

	alg = alg.toLowerCase();
        if (alg.substr(0, 4) != "hmac") {
	    throw "setAlgAndProvider unsupported HMAC alg: " + alg;
	}

	if (prov === undefined) prov = KJUR.crypto.Util.DEFAULTPROVIDER[alg];
	this.algProv = alg + "/" + prov;

	var hashAlg = alg.substr(4);

	// for cryptojs
	if (':md5:sha1:sha224:sha256:sha384:sha512:ripemd160:'.indexOf(hashAlg) != -1 &&
	    prov == 'cryptojs') {
	    try {
		var mdObj = eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[hashAlg]);
		this.mac = CryptoJS.algo.HMAC.create(mdObj, this.pass);
	    } catch (ex) {
		throw "setAlgAndProvider hash alg set fail hashAlg=" + hashAlg + "/" + ex;
	    }
	    this.updateString = function(str) {
		this.mac.update(str);
	    };
	    this.updateHex = function(hex) {
		var wHex = CryptoJS.enc.Hex.parse(hex);
		this.mac.update(wHex);
	    };
	    this.doFinal = function() {
		var hash = this.mac.finalize();
		return hash.toString(CryptoJS.enc.Hex);
	    };
	    this.doFinalString = function(str) {
		this.updateString(str);
		return this.doFinal();
	    };
	    this.doFinalHex = function(hex) {
		this.updateHex(hex);
		return this.doFinal();
	    };
	}
    };

    /**
     * update digest by specified string
     * @name updateString
     * @memberOf KJUR.crypto.Mac
     * @function
     * @param {String} str string to update
     * @description
     * @example
     * md.updateString('New York');
     */
    this.updateString = function(str) {
	throw "updateString(str) not supported for this alg/prov: " + this.algProv;
    };

    /**
     * update digest by specified hexadecimal string
     * @name updateHex
     * @memberOf KJUR.crypto.Mac
     * @function
     * @param {String} hex hexadecimal string to update
     * @description
     * @example
     * md.updateHex('0afe36');
     */
    this.updateHex = function(hex) {
	throw "updateHex(hex) not supported for this alg/prov: " + this.algProv;
    };

    /**
     * completes hash calculation and returns hash result
     * @name doFinal
     * @memberOf KJUR.crypto.Mac
     * @function
     * @description
     * @example
     * md.digest()
     */
    this.doFinal = function() {
	throw "digest() not supported for this alg/prov: " + this.algProv;
    };

    /**
     * performs final update on the digest using string, then completes the digest computation
     * @name doFinalString
     * @memberOf KJUR.crypto.Mac
     * @function
     * @param {String} str string to final update
     * @description
     * @example
     * md.digestString('aaa')
     */
    this.doFinalString = function(str) {
	throw "digestString(str) not supported for this alg/prov: " + this.algProv;
    };

    /**
     * performs final update on the digest using hexadecimal string, 
     * then completes the digest computation
     * @name doFinalHex
     * @memberOf KJUR.crypto.Mac
     * @function
     * @param {String} hex hexadecimal string to final update
     * @description
     * @example
     * md.digestHex('0f2abd')
     */
    this.doFinalHex = function(hex) {
	throw "digestHex(hex) not supported for this alg/prov: " + this.algProv;
    };

    if (params !== undefined) {
	if (params['pass'] !== undefined) {
	    this.pass = params['pass'];
	}
	if (params['alg'] !== undefined) {
	    this.algName = params['alg'];
	    if (params['prov'] === undefined)
		this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
	    this.setAlgAndProvider(this.algName, this.provName);
	}
    }
};

/**
 * Signature class which is very similar to java.security.Signature class
 * @name KJUR.crypto.Signature
 * @class Signature class which is very similar to java.security.Signature class
 * @param {Array} params parameters for constructor
 * @property {String} state Current state of this signature object whether 'SIGN', 'VERIFY' or null
 * @description
 * <br/>
 * As for params of constructor's argument, it can be specify following attributes:
 * <ul>
 * <li>alg - signature algorithm name (ex. {MD5,SHA1,SHA224,SHA256,SHA384,SHA512,RIPEMD160}with{RSA,ECDSA,DSA})</li>
 * <li>provider - currently 'cryptojs/jsrsa' only</li>
 * </ul>
 * <h4>SUPPORTED ALGORITHMS AND PROVIDERS</h4>
 * This Signature class supports following signature algorithm and provider names:
 * <ul>
 * <li>MD5withRSA - cryptojs/jsrsa</li>
 * <li>SHA1withRSA - cryptojs/jsrsa</li>
 * <li>SHA224withRSA - cryptojs/jsrsa</li>
 * <li>SHA256withRSA - cryptojs/jsrsa</li>
 * <li>SHA384withRSA - cryptojs/jsrsa</li>
 * <li>SHA512withRSA - cryptojs/jsrsa</li>
 * <li>RIPEMD160withRSA - cryptojs/jsrsa</li>
 * <li>MD5withECDSA - cryptojs/jsrsa</li>
 * <li>SHA1withECDSA - cryptojs/jsrsa</li>
 * <li>SHA224withECDSA - cryptojs/jsrsa</li>
 * <li>SHA256withECDSA - cryptojs/jsrsa</li>
 * <li>SHA384withECDSA - cryptojs/jsrsa</li>
 * <li>SHA512withECDSA - cryptojs/jsrsa</li>
 * <li>RIPEMD160withECDSA - cryptojs/jsrsa</li>
 * <li>MD5withRSAandMGF1 - cryptojs/jsrsa</li>
 * <li>SHA1withRSAandMGF1 - cryptojs/jsrsa</li>
 * <li>SHA224withRSAandMGF1 - cryptojs/jsrsa</li>
 * <li>SHA256withRSAandMGF1 - cryptojs/jsrsa</li>
 * <li>SHA384withRSAandMGF1 - cryptojs/jsrsa</li>
 * <li>SHA512withRSAandMGF1 - cryptojs/jsrsa</li>
 * <li>RIPEMD160withRSAandMGF1 - cryptojs/jsrsa</li>
 * <li>SHA1withDSA - cryptojs/jsrsa</li>
 * <li>SHA224withDSA - cryptojs/jsrsa</li>
 * <li>SHA256withDSA - cryptojs/jsrsa</li>
 * </ul>
 * Here are supported elliptic cryptographic curve names and their aliases for ECDSA:
 * <ul>
 * <li>secp256k1</li>
 * <li>secp256r1, NIST P-256, P-256, prime256v1</li>
 * <li>secp384r1, NIST P-384, P-384</li>
 * </ul>
 * NOTE1: DSA signing algorithm is also supported since crypto 1.1.5.
 * <h4>EXAMPLES</h4>
 * @example
 * // RSA signature generation
 * var sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
 * sig.init(prvKeyPEM);
 * sig.updateString('aaa');
 * var hSigVal = sig.sign();
 *
 * // DSA signature validation
 * var sig2 = new KJUR.crypto.Signature({"alg": "SHA1withDSA"});
 * sig2.init(certPEM);
 * sig.updateString('aaa');
 * var isValid = sig2.verify(hSigVal);
 * 
 * // ECDSA signing
 * var sig = new KJUR.crypto.Signature({'alg':'SHA1withECDSA'});
 * sig.init(prvKeyPEM);
 * sig.updateString('aaa');
 * var sigValueHex = sig.sign();
 *
 * // ECDSA verifying
 * var sig2 = new KJUR.crypto.Signature({'alg':'SHA1withECDSA'});
 * sig.init(certPEM);
 * sig.updateString('aaa');
 * var isValid = sig.verify(sigValueHex);
 */
KJUR.crypto.Signature = function(params) {
    var prvKey = null; // RSAKey/KJUR.crypto.{ECDSA,DSA} object for signing
    var pubKey = null; // RSAKey/KJUR.crypto.{ECDSA,DSA} object for verifying

    var md = null; // KJUR.crypto.MessageDigest object
    var sig = null;
    var algName = null;
    var provName = null;
    var algProvName = null;
    var mdAlgName = null;
    var pubkeyAlgName = null;	// rsa,ecdsa,rsaandmgf1(=rsapss)
    var state = null;
    var pssSaltLen = -1;
    var initParams = null;

    var sHashHex = null; // hex hash value for hex
    var hDigestInfo = null;
    var hPaddedDigestInfo = null;
    var hSign = null;

    this._setAlgNames = function() {
	if (this.algName.match(/^(.+)with(.+)$/)) {
	    this.mdAlgName = RegExp.$1.toLowerCase();
	    this.pubkeyAlgName = RegExp.$2.toLowerCase();
	}
    };

    this._zeroPaddingOfSignature = function(hex, bitLength) {
	var s = "";
	var nZero = bitLength / 4 - hex.length;
	for (var i = 0; i < nZero; i++) {
	    s = s + "0";
	}
	return s + hex;
    };

    /**
     * set signature algorithm and provider
     * @name setAlgAndProvider
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {String} alg signature algorithm name
     * @param {String} prov provider name
     * @description
     * @example
     * md.setAlgAndProvider('SHA1withRSA', 'cryptojs/jsrsa');
     */
    this.setAlgAndProvider = function(alg, prov) {
	this._setAlgNames();
	if (prov != 'cryptojs/jsrsa')
	    throw "provider not supported: " + prov;

	if (':md5:sha1:sha224:sha256:sha384:sha512:ripemd160:'.indexOf(this.mdAlgName) != -1) {
	    try {
		this.md = new KJUR.crypto.MessageDigest({'alg':this.mdAlgName});
	    } catch (ex) {
		throw "setAlgAndProvider hash alg set fail alg=" +
                      this.mdAlgName + "/" + ex;
	    }

	    this.init = function(keyparam, pass) {
		var keyObj = null;
		try {
		    if (pass === undefined) {
			keyObj = KEYUTIL.getKey(keyparam);
		    } else {
			keyObj = KEYUTIL.getKey(keyparam, pass);
		    }
		} catch (ex) {
		    throw "init failed:" + ex;
		}

		if (keyObj.isPrivate === true) {
		    this.prvKey = keyObj;
		    this.state = "SIGN";
		} else if (keyObj.isPublic === true) {
		    this.pubKey = keyObj;
		    this.state = "VERIFY";
		} else {
		    throw "init failed.:" + keyObj;
		}
	    };

	    this.initSign = function(params) {
		if (typeof params['ecprvhex'] == 'string' &&
                    typeof params['eccurvename'] == 'string') {
		    this.ecprvhex = params['ecprvhex'];
		    this.eccurvename = params['eccurvename'];
		} else {
		    this.prvKey = params;
		}
		this.state = "SIGN";
	    };

	    this.initVerifyByPublicKey = function(params) {
		if (typeof params['ecpubhex'] == 'string' &&
		    typeof params['eccurvename'] == 'string') {
		    this.ecpubhex = params['ecpubhex'];
		    this.eccurvename = params['eccurvename'];
		} else if (params instanceof KJUR.crypto.ECDSA) {
		    this.pubKey = params;
		} else if (params instanceof RSAKey) {
		    this.pubKey = params;
		}
		this.state = "VERIFY";
	    };

	    this.initVerifyByCertificatePEM = function(certPEM) {
		var x509 = new X509();
		x509.readCertPEM(certPEM);
		this.pubKey = x509.subjectPublicKeyRSA;
		this.state = "VERIFY";
	    };

	    this.updateString = function(str) {
		this.md.updateString(str);
	    };
	    this.updateHex = function(hex) {
		this.md.updateHex(hex);
	    };

	    this.sign = function() {
		this.sHashHex = this.md.digest();
		if (typeof this.ecprvhex != "undefined" &&
		    typeof this.eccurvename != "undefined") {
		    var ec = new KJUR.crypto.ECDSA({'curve': this.eccurvename});
		    this.hSign = ec.signHex(this.sHashHex, this.ecprvhex);
		} else if (this.pubkeyAlgName == "rsaandmgf1") {
		    this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex,
								    this.mdAlgName,
								    this.pssSaltLen);
		} else if (this.pubkeyAlgName == "rsa") {
		    this.hSign = this.prvKey.signWithMessageHash(this.sHashHex,
								 this.mdAlgName);
		} else if (this.prvKey instanceof KJUR.crypto.ECDSA) {
		    this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
		} else if (this.prvKey instanceof KJUR.crypto.DSA) {
		    this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
		} else {
		    throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
		}
		return this.hSign;
	    };
	    this.signString = function(str) {
		this.updateString(str);
		return this.sign();
	    };
	    this.signHex = function(hex) {
		this.updateHex(hex);
		return this.sign();
	    };
	    this.verify = function(hSigVal) {
	        this.sHashHex = this.md.digest();
		if (typeof this.ecpubhex != "undefined" &&
		    typeof this.eccurvename != "undefined") {
		    var ec = new KJUR.crypto.ECDSA({curve: this.eccurvename});
		    return ec.verifyHex(this.sHashHex, hSigVal, this.ecpubhex);
		} else if (this.pubkeyAlgName == "rsaandmgf1") {
		    return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, hSigVal, 
								this.mdAlgName,
								this.pssSaltLen);
		} else if (this.pubkeyAlgName == "rsa") {
		    return this.pubKey.verifyWithMessageHash(this.sHashHex, hSigVal);
		} else if (this.pubKey instanceof KJUR.crypto.ECDSA) {
		    return this.pubKey.verifyWithMessageHash(this.sHashHex, hSigVal);
		} else if (this.pubKey instanceof KJUR.crypto.DSA) {
		    return this.pubKey.verifyWithMessageHash(this.sHashHex, hSigVal);
		} else {
		    throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
		}
	    };
	}
    };

    /**
     * Initialize this object for signing or verifying depends on key
     * @name init
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {Object} key specifying public or private key as plain/encrypted PKCS#5/8 PEM file, certificate PEM or {@link RSAKey}, {@link KJUR.crypto.DSA} or {@link KJUR.crypto.ECDSA} object
     * @param {String} pass (OPTION) passcode for encrypted private key
     * @since crypto 1.1.3
     * @description
     * This method is very useful initialize method for Signature class since
     * you just specify key then this method will automatically initialize it
     * using {@link KEYUTIL.getKey} method.
     * As for 'key',  following argument type are supported:
     * <h5>signing</h5>
     * <ul>
     * <li>PEM formatted PKCS#8 encrypted RSA/ECDSA private key concluding "BEGIN ENCRYPTED PRIVATE KEY"</li>
     * <li>PEM formatted PKCS#5 encrypted RSA/DSA private key concluding "BEGIN RSA/DSA PRIVATE KEY" and ",ENCRYPTED"</li>
     * <li>PEM formatted PKCS#8 plain RSA/ECDSA private key concluding "BEGIN PRIVATE KEY"</li>
     * <li>PEM formatted PKCS#5 plain RSA/DSA private key concluding "BEGIN RSA/DSA PRIVATE KEY" without ",ENCRYPTED"</li>
     * <li>RSAKey object of private key</li>
     * <li>KJUR.crypto.ECDSA object of private key</li>
     * <li>KJUR.crypto.DSA object of private key</li>
     * </ul>
     * <h5>verification</h5>
     * <ul>
     * <li>PEM formatted PKCS#8 RSA/EC/DSA public key concluding "BEGIN PUBLIC KEY"</li>
     * <li>PEM formatted X.509 certificate with RSA/EC/DSA public key concluding
     *     "BEGIN CERTIFICATE", "BEGIN X509 CERTIFICATE" or "BEGIN TRUSTED CERTIFICATE".</li>
     * <li>RSAKey object of public key</li>
     * <li>KJUR.crypto.ECDSA object of public key</li>
     * <li>KJUR.crypto.DSA object of public key</li>
     * </ul>
     * @example
     * sig.init(sCertPEM)
     */
    this.init = function(key, pass) {
	throw "init(key, pass) not supported for this alg:prov=" +
	      this.algProvName;
    };

    /**
     * Initialize this object for verifying with a public key
     * @name initVerifyByPublicKey
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {Object} param RSAKey object of public key or associative array for ECDSA
     * @since 1.0.2
     * @deprecated from crypto 1.1.5. please use init() method instead.
     * @description
     * Public key information will be provided as 'param' parameter and the value will be
     * following:
     * <ul>
     * <li>{@link RSAKey} object for RSA verification</li>
     * <li>associative array for ECDSA verification
     *     (ex. <code>{'ecpubhex': '041f..', 'eccurvename': 'secp256r1'}</code>)
     * </li>
     * </ul>
     * @example
     * sig.initVerifyByPublicKey(rsaPrvKey)
     */
    this.initVerifyByPublicKey = function(rsaPubKey) {
	throw "initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov=" +
	      this.algProvName;
    };

    /**
     * Initialize this object for verifying with a certficate
     * @name initVerifyByCertificatePEM
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {String} certPEM PEM formatted string of certificate
     * @since 1.0.2
     * @deprecated from crypto 1.1.5. please use init() method instead.
     * @description
     * @example
     * sig.initVerifyByCertificatePEM(certPEM)
     */
    this.initVerifyByCertificatePEM = function(certPEM) {
	throw "initVerifyByCertificatePEM(certPEM) not supported for this alg:prov=" +
	    this.algProvName;
    };

    /**
     * Initialize this object for signing
     * @name initSign
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {Object} param RSAKey object of public key or associative array for ECDSA
     * @deprecated from crypto 1.1.5. please use init() method instead.
     * @description
     * Private key information will be provided as 'param' parameter and the value will be
     * following:
     * <ul>
     * <li>{@link RSAKey} object for RSA signing</li>
     * <li>associative array for ECDSA signing
     *     (ex. <code>{'ecprvhex': '1d3f..', 'eccurvename': 'secp256r1'}</code>)</li>
     * </ul>
     * @example
     * sig.initSign(prvKey)
     */
    this.initSign = function(prvKey) {
	throw "initSign(prvKey) not supported for this alg:prov=" + this.algProvName;
    };

    /**
     * Updates the data to be signed or verified by a string
     * @name updateString
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {String} str string to use for the update
     * @description
     * @example
     * sig.updateString('aaa')
     */
    this.updateString = function(str) {
	throw "updateString(str) not supported for this alg:prov=" + this.algProvName;
    };

    /**
     * Updates the data to be signed or verified by a hexadecimal string
     * @name updateHex
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {String} hex hexadecimal string to use for the update
     * @description
     * @example
     * sig.updateHex('1f2f3f')
     */
    this.updateHex = function(hex) {
	throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName;
    };

    /**
     * Returns the signature bytes of all data updates as a hexadecimal string
     * @name sign
     * @memberOf KJUR.crypto.Signature
     * @function
     * @return the signature bytes as a hexadecimal string
     * @description
     * @example
     * var hSigValue = sig.sign()
     */
    this.sign = function() {
	throw "sign() not supported for this alg:prov=" + this.algProvName;
    };

    /**
     * performs final update on the sign using string, then returns the signature bytes of all data updates as a hexadecimal string
     * @name signString
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {String} str string to final update
     * @return the signature bytes of a hexadecimal string
     * @description
     * @example
     * var hSigValue = sig.signString('aaa')
     */
    this.signString = function(str) {
	throw "digestString(str) not supported for this alg:prov=" + this.algProvName;
    };

    /**
     * performs final update on the sign using hexadecimal string, then returns the signature bytes of all data updates as a hexadecimal string
     * @name signHex
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {String} hex hexadecimal string to final update
     * @return the signature bytes of a hexadecimal string
     * @description
     * @example
     * var hSigValue = sig.signHex('1fdc33')
     */
    this.signHex = function(hex) {
	throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName;
    };

    /**
     * verifies the passed-in signature.
     * @name verify
     * @memberOf KJUR.crypto.Signature
     * @function
     * @param {String} str string to final update
     * @return {Boolean} true if the signature was verified, otherwise false
     * @description
     * @example
     * var isValid = sig.verify('1fbcefdca4823a7(snip)')
     */
    this.verify = function(hSigVal) {
	throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName;
    };

    this.initParams = params;

    if (params !== undefined) {
	if (params['alg'] !== undefined) {
	    this.algName = params['alg'];
	    if (params['prov'] === undefined) {
		this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
	    } else {
		this.provName = params['prov'];
	    }
	    this.algProvName = this.algName + ":" + this.provName;
	    this.setAlgAndProvider(this.algName, this.provName);
	    this._setAlgNames();
	}

	if (params['psssaltlen'] !== undefined) this.pssSaltLen = params['psssaltlen'];

	if (params['prvkeypem'] !== undefined) {
	    if (params['prvkeypas'] !== undefined) {
		throw "both prvkeypem and prvkeypas parameters not supported";
	    } else {
		try {
		    var prvKey = new RSAKey();
		    prvKey.readPrivateKeyFromPEMString(params['prvkeypem']);
		    this.initSign(prvKey);
		} catch (ex) {
		    throw "fatal error to load pem private key: " + ex;
		}
	    }
	}
    }
};

/**
 * static object for cryptographic function utilities
 * @name KJUR.crypto.OID
 * @class static object for cryptography related OIDs
 * @property {Array} oidhex2name key value of hexadecimal OID and its name
 *           (ex. '2a8648ce3d030107' and 'secp256r1')
 * @since crypto 1.1.3
 * @description
 */


KJUR.crypto.OID = new function() {
    this.oidhex2name = {
	'2a864886f70d010101': 'rsaEncryption',
	'2a8648ce3d0201': 'ecPublicKey',
	'2a8648ce380401': 'dsa',
	'2a8648ce3d030107': 'secp256r1',
	'2b8104001f': 'secp192k1',
	'2b81040021': 'secp224r1',
	'2b8104000a': 'secp256k1',
	'2b81040023': 'secp521r1',
	'2b81040022': 'secp384r1',
	'2a8648ce380403': 'SHA1withDSA', // 1.2.840.10040.4.3
	'608648016503040301': 'SHA224withDSA', // 2.16.840.1.101.3.4.3.1
	'608648016503040302': 'SHA256withDSA', // 2.16.840.1.101.3.4.3.2
    };
};

/*! base64x-1.1.3 (c) 2012-2014 Kenji Urushima | kjur.github.com/jsjws/license
 */
/*
 * base64x.js - Base64url and supplementary functions for Tom Wu's base64.js library
 *
 * version: 1.1.3 (2014 May 25)
 *
 * Copyright (c) 2012-2014 Kenji Urushima (kenji.urushima@gmail.com)
 *
 * This software is licensed under the terms of the MIT License.
 * http://kjur.github.com/jsjws/license/
 *
 * The above copyright and license notice shall be 
 * included in all copies or substantial portions of the Software.
 *
 * DEPENDS ON:
 *   - base64.js - Tom Wu's Base64 library
 */

/**
 * Base64URL and supplementary functions for Tom Wu's base64.js library.<br/>
 * This class is just provide information about global functions
 * defined in 'base64x.js'. The 'base64x.js' script file provides
 * global functions for converting following data each other.
 * <ul>
 * <li>(ASCII) String</li>
 * <li>UTF8 String including CJK, Latin and other characters</li>
 * <li>byte array</li>
 * <li>hexadecimal encoded String</li>
 * <li>Full URIComponent encoded String (such like "%69%94")</li>
 * <li>Base64 encoded String</li>
 * <li>Base64URL encoded String</li>
 * </ul>
 * All functions in 'base64x.js' are defined in {@link _global_} and not
 * in this class.
 * 
 * @class Base64URL and supplementary functions for Tom Wu's base64.js library
 * @author Kenji Urushima
 * @version 1.1 (07 May 2012)
 * @requires base64.js
 * @see <a href="http://kjur.github.com/jsjws/">'jwjws'(JWS JavaScript Library) home page http://kjur.github.com/jsjws/</a>
 * @see <a href="http://kjur.github.com/jsrsasigns/">'jwrsasign'(RSA Sign JavaScript Library) home page http://kjur.github.com/jsrsasign/</a>
 */
function Base64x() {
}

// ==== string / byte array ================================
/**
 * convert a string to an array of character codes
 * @param {String} s
 * @return {Array of Numbers} 
 */
function stoBA(s) {
    var a = new Array();
    for (var i = 0; i < s.length; i++) {
	a[i] = s.charCodeAt(i);
    }
    return a;
}

/**
 * convert an array of character codes to a string
 * @param {Array of Numbers} a array of character codes
 * @return {String} s
 */
function BAtos(a) {
    var s = "";
    for (var i = 0; i < a.length; i++) {
	s = s + String.fromCharCode(a[i]);
    }
    return s;
}

// ==== byte array / hex ================================
/**
 * convert an array of bytes(Number) to hexadecimal string.<br/>
 * @param {Array of Numbers} a array of bytes
 * @return {String} hexadecimal string
 */
function BAtohex(a) {
    var s = "";
    for (var i = 0; i < a.length; i++) {
	var hex1 = a[i].toString(16);
	if (hex1.length == 1) hex1 = "0" + hex1;
	s = s + hex1;
    }
    return s;
}

// ==== string / hex ================================
/**
 * convert a ASCII string to a hexadecimal string of ASCII codes.<br/>
 * NOTE: This can't be used for non ASCII characters.
 * @param {s} s ASCII string
 * @return {String} hexadecimal string
 */
function stohex(s) {
    return BAtohex(stoBA(s));
}

// ==== string / base64 ================================
/**
 * convert a ASCII string to a Base64 encoded string.<br/>
 * NOTE: This can't be used for non ASCII characters.
 * @param {s} s ASCII string
 * @return {String} Base64 encoded string
 */
function stob64(s) {
    return hex2b64(stohex(s));
}

// ==== string / base64url ================================
/**
 * convert a ASCII string to a Base64URL encoded string.<br/>
 * NOTE: This can't be used for non ASCII characters.
 * @param {s} s ASCII string
 * @return {String} Base64URL encoded string
 */
function stob64u(s) {
    return b64tob64u(hex2b64(stohex(s)));
}

/**
 * convert a Base64URL encoded string to a ASCII string.<br/>
 * NOTE: This can't be used for Base64URL encoded non ASCII characters.
 * @param {s} s Base64URL encoded string
 * @return {String} ASCII string
 */
function b64utos(s) {
    return BAtos(b64toBA(b64utob64(s)));
}

// ==== base64 / base64url ================================
/**
 * convert a Base64 encoded string to a Base64URL encoded string.<br/>
 * Example: "ab+c3f/==" &rarr; "ab-c3f_"
 * @param {String} s Base64 encoded string
 * @return {String} Base64URL encoded string
 */
function b64tob64u(s) {
    s = s.replace(/\=/g, "");
    s = s.replace(/\+/g, "-");
    s = s.replace(/\//g, "_");
    return s;
}

/**
 * convert a Base64URL encoded string to a Base64 encoded string.<br/>
 * Example: "ab-c3f_" &rarr; "ab+c3f/=="
 * @param {String} s Base64URL encoded string
 * @return {String} Base64 encoded string
 */
function b64utob64(s) {
    if (s.length % 4 == 2) s = s + "==";
    else if (s.length % 4 == 3) s = s + "=";
    s = s.replace(/-/g, "+");
    s = s.replace(/_/g, "/");
    return s;
}

// ==== hex / base64url ================================
/**
 * convert a hexadecimal string to a Base64URL encoded string.<br/>
 * @param {String} s hexadecimal string
 * @return {String} Base64URL encoded string
 */
function hextob64u(s) {
    return b64tob64u(hex2b64(s));
}

/**
 * convert a Base64URL encoded string to a hexadecimal string.<br/>
 * @param {String} s Base64URL encoded string
 * @return {String} hexadecimal string
 */
function b64utohex(s) {
    return b64tohex(b64utob64(s));
}

var utf8tob64u, b64utoutf8;

if (typeof Buffer === 'function')
{
  utf8tob64u = function (s)
  {
    return b64tob64u(new Buffer(s, 'utf8').toString('base64'));
  };

  b64utoutf8 = function (s)
  {
    return new Buffer(b64utob64(s), 'base64').toString('utf8');
  };
}
else
{
// ==== utf8 / base64url ================================
/**
 * convert a UTF-8 encoded string including CJK or Latin to a Base64URL encoded string.<br/>
 * @param {String} s UTF-8 encoded string
 * @return {String} Base64URL encoded string
 * @since 1.1
 */
  utf8tob64u = function (s)
  {
    return hextob64u(uricmptohex(encodeURIComponentAll(s)));
  };

/**
 * convert a Base64URL encoded string to a UTF-8 encoded string including CJK or Latin.<br/>
 * @param {String} s Base64URL encoded string
 * @return {String} UTF-8 encoded string
 * @since 1.1
 */
  b64utoutf8 = function (s)
  {
    return decodeURIComponent(hextouricmp(b64utohex(s)));
  };
}

// ==== utf8 / base64url ================================
/**
 * convert a UTF-8 encoded string including CJK or Latin to a Base64 encoded string.<br/>
 * @param {String} s UTF-8 encoded string
 * @return {String} Base64 encoded string
 * @since 1.1.1
 */
function utf8tob64(s) {
  return hex2b64(uricmptohex(encodeURIComponentAll(s)));
}

/**
 * convert a Base64 encoded string to a UTF-8 encoded string including CJK or Latin.<br/>
 * @param {String} s Base64 encoded string
 * @return {String} UTF-8 encoded string
 * @since 1.1.1
 */
function b64toutf8(s) {
  return decodeURIComponent(hextouricmp(b64tohex(s)));
}

// ==== utf8 / hex ================================
/**
 * convert a UTF-8 encoded string including CJK or Latin to a hexadecimal encoded string.<br/>
 * @param {String} s UTF-8 encoded string
 * @return {String} hexadecimal encoded string
 * @since 1.1.1
 */
function utf8tohex(s) {
  return uricmptohex(encodeURIComponentAll(s));
}

/**
 * convert a hexadecimal encoded string to a UTF-8 encoded string including CJK or Latin.<br/>
 * Note that when input is improper hexadecimal string as UTF-8 string, this function returns
 * 'null'.
 * @param {String} s hexadecimal encoded string
 * @return {String} UTF-8 encoded string or null
 * @since 1.1.1
 */
function hextoutf8(s) {
  return decodeURIComponent(hextouricmp(s));
}

/**
 * convert a hexadecimal encoded string to raw string including non printable characters.<br/>
 * @param {String} s hexadecimal encoded string
 * @return {String} raw string
 * @since 1.1.2
 * @example
 * hextorstr("610061") &rarr; "a\x00a"
 */
function hextorstr(sHex) {
    var s = "";
    for (var i = 0; i < sHex.length - 1; i += 2) {
        s += String.fromCharCode(parseInt(sHex.substr(i, 2), 16));
    }
    return s;
}

/**
 * convert a raw string including non printable characters to hexadecimal encoded string.<br/>
 * @param {String} s raw string
 * @return {String} hexadecimal encoded string
 * @since 1.1.2
 * @example
 * rstrtohex("a\x00a") &rarr; "610061"
 */
function rstrtohex(s) {
    var result = "";
    for (var i = 0; i < s.length; i++) {
        result += ("0" + s.charCodeAt(i).toString(16)).slice(-2);
    }
    return result;
}

// ==== hex / b64nl =======================================

/*
 * since base64x 1.1.3
 */
function hextob64(s) {
    return hex2b64(s);
}

/*
 * since base64x 1.1.3
 */
function hextob64nl(s) {
    var b64 = hextob64(s);
    var b64nl = b64.replace(/(.{64})/g, "$1\r\n");
    b64nl = b64nl.replace(/\r\n$/, '');
    return b64nl;
}

/*
 * since base64x 1.1.3
 */
function b64nltohex(s) {
    var b64 = s.replace(/[^0-9A-Za-z\/+=]*/g, '');
    var hex = b64tohex(b64);
    return hex;
} 

// ==== URIComponent / hex ================================
/**
 * convert a URLComponent string such like "%67%68" to a hexadecimal string.<br/>
 * @param {String} s URIComponent string such like "%67%68"
 * @return {String} hexadecimal string
 * @since 1.1
 */
function uricmptohex(s) {
  return s.replace(/%/g, "");
}

/**
 * convert a hexadecimal string to a URLComponent string such like "%67%68".<br/>
 * @param {String} s hexadecimal string
 * @return {String} URIComponent string such like "%67%68"
 * @since 1.1
 */
function hextouricmp(s) {
  return s.replace(/(..)/g, "%$1");
}

// ==== URIComponent ================================
/**
 * convert UTFa hexadecimal string to a URLComponent string such like "%67%68".<br/>
 * Note that these "<code>0-9A-Za-z!'()*-._~</code>" characters will not
 * converted to "%xx" format by builtin 'encodeURIComponent()' function.
 * However this 'encodeURIComponentAll()' function will convert 
 * all of characters into "%xx" format.
 * @param {String} s hexadecimal string
 * @return {String} URIComponent string such like "%67%68"
 * @since 1.1
 */
function encodeURIComponentAll(u8) {
  var s = encodeURIComponent(u8);
  var s2 = "";
  for (var i = 0; i < s.length; i++) {
    if (s[i] == "%") {
      s2 = s2 + s.substr(i, 3);
      i = i + 2;
    } else {
      s2 = s2 + "%" + stohex(s[i]);
    }
  }
  return s2;
}

// ==== new lines ================================
/**
 * convert all DOS new line("\r\n") to UNIX new line("\n") in 
 * a String "s".
 * @param {String} s string 
 * @return {String} converted string
 */
function newline_toUnix(s) {
    s = s.replace(/\r\n/mg, "\n");
    return s;
}

/**
 * convert all UNIX new line("\r\n") to DOS new line("\n") in 
 * a String "s".
 * @param {String} s string 
 * @return {String} converted string
 */
function newline_toDos(s) {
    s = s.replace(/\r\n/mg, "\n");
    s = s.replace(/\n/mg, "\r\n");
    return s;
}

// This source code is free for use in the public domain.
// NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

// http://code.google.com/p/json-sans-eval/

/**
 * Parses a string of well-formed JSON text.
 *
 * If the input is not well-formed, then behavior is undefined, but it is
 * deterministic and is guaranteed not to modify any object other than its
 * return value.
 *
 * This does not use `eval` so is less likely to have obscure security bugs than
 * json2.js.
 * It is optimized for speed, so is much faster than json_parse.js.
 *
 * This library should be used whenever security is a concern (when JSON may
 * come from an untrusted source), speed is a concern, and erroring on malformed
 * JSON is *not* a concern.
 *
 *                      Pros                   Cons
 *                    +-----------------------+-----------------------+
 * json_sans_eval.js  | Fast, secure          | Not validating        |
 *                    +-----------------------+-----------------------+
 * json_parse.js      | Validating, secure    | Slow                  |
 *                    +-----------------------+-----------------------+
 * json2.js           | Fast, some validation | Potentially insecure  |
 *                    +-----------------------+-----------------------+
 *
 * json2.js is very fast, but potentially insecure since it calls `eval` to
 * parse JSON data, so an attacker might be able to supply strange JS that
 * looks like JSON, but that executes arbitrary javascript.
 * If you do have to use json2.js with untrusted data, make sure you keep
 * your version of json2.js up to date so that you get patches as they're
 * released.
 *
 * @param {string} json per RFC 4627
 * @param {function (this:Object, string, *):*} opt_reviver optional function
 *     that reworks JSON objects post-parse per Chapter 15.12 of EcmaScript3.1.
 *     If supplied, the function is called with a string key, and a value.
 *     The value is the property of 'this'.  The reviver should return
 *     the value to use in its place.  So if dates were serialized as
 *     {@code { "type": "Date", "time": 1234 }}, then a reviver might look like
 *     {@code
 *     function (key, value) {
 *       if (value && typeof value === 'object' && 'Date' === value.type) {
 *         return new Date(value.time);
 *       } else {
 *         return value;
 *       }
 *     }}.
 *     If the reviver returns {@code undefined} then the property named by key
 *     will be deleted from its container.
 *     {@code this} is bound to the object containing the specified property.
 * @return {Object|Array}
 * @author Mike Samuel <mikesamuel@gmail.com>
 */
var jsonParse = (function () {
  var number
      = '(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)';
  var oneChar = '(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]'
      + '|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
  var string = '(?:\"' + oneChar + '*\")';

  // Will match a value in a well-formed JSON file.
  // If the input is not well-formed, may match strangely, but not in an unsafe
  // way.
  // Since this only matches value tokens, it does not match whitespace, colons,
  // or commas.
  var jsonToken = new RegExp(
      '(?:false|true|null|[\\{\\}\\[\\]]'
      + '|' + number
      + '|' + string
      + ')', 'g');

  // Matches escape sequences in a string literal
  var escapeSequence = new RegExp('\\\\(?:([^u])|u(.{4}))', 'g');

  // Decodes escape sequences in object literals
  var escapes = {
    '"': '"',
    '/': '/',
    '\\': '\\',
    'b': '\b',
    'f': '\f',
    'n': '\n',
    'r': '\r',
    't': '\t'
  };
  function unescapeOne(_, ch, hex) {
    return ch ? escapes[ch] : String.fromCharCode(parseInt(hex, 16));
  }

  // A non-falsy value that coerces to the empty string when used as a key.
  var EMPTY_STRING = new String('');
  var SLASH = '\\';

  // Constructor to use based on an open token.
  var firstTokenCtors = { '{': Object, '[': Array };

  var hop = Object.hasOwnProperty;

  return function (json, opt_reviver) {
    // Split into tokens
    var toks = json.match(jsonToken);
    // Construct the object to return
    var result;
    var tok = toks[0];
    var topLevelPrimitive = false;
    if ('{' === tok) {
      result = {};
    } else if ('[' === tok) {
      result = [];
    } else {
      // The RFC only allows arrays or objects at the top level, but the JSON.parse
      // defined by the EcmaScript 5 draft does allow strings, booleans, numbers, and null
      // at the top level.
      result = [];
      topLevelPrimitive = true;
    }

    // If undefined, the key in an object key/value record to use for the next
    // value parsed.
    var key;
    // Loop over remaining tokens maintaining a stack of uncompleted objects and
    // arrays.
    var stack = [result];
    for (var i = 1 - topLevelPrimitive, n = toks.length; i < n; ++i) {
      tok = toks[i];

      var cont;
      switch (tok.charCodeAt(0)) {
        default:  // sign or digit
          cont = stack[0];
          cont[key || cont.length] = +(tok);
          key = void 0;
          break;
        case 0x22:  // '"'
          tok = tok.substring(1, tok.length - 1);
          if (tok.indexOf(SLASH) !== -1) {
            tok = tok.replace(escapeSequence, unescapeOne);
          }
          cont = stack[0];
          if (!key) {
            if (cont instanceof Array) {
              key = cont.length;
            } else {
              key = tok || EMPTY_STRING;  // Use as key for next value seen.
              break;
            }
          }
          cont[key] = tok;
          key = void 0;
          break;
        case 0x5b:  // '['
          cont = stack[0];
          stack.unshift(cont[key || cont.length] = []);
          key = void 0;
          break;
        case 0x5d:  // ']'
          stack.shift();
          break;
        case 0x66:  // 'f'
          cont = stack[0];
          cont[key || cont.length] = false;
          key = void 0;
          break;
        case 0x6e:  // 'n'
          cont = stack[0];
          cont[key || cont.length] = null;
          key = void 0;
          break;
        case 0x74:  // 't'
          cont = stack[0];
          cont[key || cont.length] = true;
          key = void 0;
          break;
        case 0x7b:  // '{'
          cont = stack[0];
          stack.unshift(cont[key || cont.length] = {});
          key = void 0;
          break;
        case 0x7d:  // '}'
          stack.shift();
          break;
      }
    }
    // Fail if we've got an uncompleted object.
    if (topLevelPrimitive) {
      if (stack.length !== 1) { throw new Error(); }
      result = result[0];
    } else {
      if (stack.length) { throw new Error(); }
    }

    if (opt_reviver) {
      // Based on walk as implemented in http://www.json.org/json2.js
      var walk = function (holder, key) {
        var value = holder[key];
        if (value && typeof value === 'object') {
          var toDelete = null;
          for (var k in value) {
            if (hop.call(value, k) && value !== holder) {
              // Recurse to properties first.  This has the effect of causing
              // the reviver to be called on the object graph depth-first.

              // Since 'this' is bound to the holder of the property, the
              // reviver can access sibling properties of k including ones
              // that have not yet been revived.

              // The value returned by the reviver is used in place of the
              // current value of property k.
              // If it returns undefined then the property is deleted.
              var v = walk(value, k);
              if (v !== void 0) {
                value[k] = v;
              } else {
                // Deleting properties inside the loop has vaguely defined
                // semantics in ES3 and ES3.1.
                if (!toDelete) { toDelete = []; }
                toDelete.push(k);
              }
            }
          }
          if (toDelete) {
            for (var i = toDelete.length; --i >= 0;) {
              delete value[toDelete[i]];
            }
          }
        }
        return opt_reviver.call(holder, key, value);
      };
      result = walk({ '': result }, '');
    }

    return result;
  };
})();

/*! jws-2.0.3 (c) 2012 Kenji Urushima | kjur.github.com/jsjws/license
 */
if(typeof KJUR=="undefined"||!KJUR){KJUR={}}if(typeof KJUR.jws=="undefined"||!KJUR.jws){KJUR.jws={}}KJUR.jws.JWS=function(){this.isSafeJSONString=function(l,k,m){var n=null;try{n=jsonParse(l);if(typeof n!="object"){return 0}if(n.constructor===Array){return 0}if(k){k[m]=n}return 1}catch(j){return 0}};this.readSafeJSONString=function(k){var l=null;try{l=jsonParse(k);if(typeof l!="object"){return null}if(l.constructor===Array){return null}return l}catch(j){return null}};this.getEncodedSignatureValueFromJWS=function(j){if(j.match(/^[^.]+\.[^.]+\.([^.]+)$/)==null){throw"JWS signature is not a form of 'Head.Payload.SigValue'."}return RegExp.$1};this.parseJWS=function(m,o){if((this.parsedJWS!==undefined)&&(o||(this.parsedJWS.sigvalH!==undefined))){return}if(m.match(/^([^.]+)\.([^.]+)\.([^.]+)$/)==null){throw"JWS signature is not a form of 'Head.Payload.SigValue'."}var p=RegExp.$1;var k=RegExp.$2;var q=RegExp.$3;var s=p+"."+k;this.parsedJWS={};this.parsedJWS.headB64U=p;this.parsedJWS.payloadB64U=k;this.parsedJWS.sigvalB64U=q;this.parsedJWS.si=s;if(!o){var n=b64utohex(q);var l=parseBigInt(n,16);this.parsedJWS.sigvalH=n;this.parsedJWS.sigvalBI=l}var j=b64utoutf8(p);var r=b64utoutf8(k);this.parsedJWS.headS=j;this.parsedJWS.payloadS=r;if(!this.isSafeJSONString(j,this.parsedJWS,"headP")){throw"malformed JSON string for JWS Head: "+j}};function a(k,j){return utf8tob64u(k)+"."+utf8tob64u(j)}function e(l,k){var j=function(m){return KJUR.crypto.Util.hashString(m,k)};if(j==null){throw"hash function not defined in jsrsasign: "+k}return j(l)}function g(p,m,j,n,l){var o=a(p,m);var k=parseBigInt(j,16);return _rsasign_verifySignatureWithArgs(o,k,n,l)}this.verifyJWSByNE=function(l,k,j){this.parseJWS(l);return _rsasign_verifySignatureWithArgs(this.parsedJWS.si,this.parsedJWS.sigvalBI,k,j)};this.verifyJWSByKey=function(m,l){this.parseJWS(m);var j=b(this.parsedJWS.headP);var k=this.parsedJWS.headP.alg.substr(0,2)=="PS";if(l.hashAndVerify){return l.hashAndVerify(j,new Buffer(this.parsedJWS.si,"utf8").toString("base64"),b64utob64(this.parsedJWS.sigvalB64U),"base64",k)}else{if(k){return l.verifyStringPSS(this.parsedJWS.si,this.parsedJWS.sigvalH,j)}else{return l.verifyString(this.parsedJWS.si,this.parsedJWS.sigvalH)}}};this.verifyJWSByPemX509Cert=function(l,j){this.parseJWS(l);var k=new X509();k.readCertPEM(j);return k.subjectPublicKeyRSA.verifyString(this.parsedJWS.si,this.parsedJWS.sigvalH)};function b(k){var l=k.alg;var j="";if(l!="RS256"&&l!="RS512"&&l!="PS256"&&l!="PS512"){throw"JWS signature algorithm not supported: "+l}if(l.substr(2)=="256"){j="sha256"}if(l.substr(2)=="512"){j="sha512"}return j}function d(j){return b(jsonParse(j))}function i(j,o,r,l,p,q){var m=new RSAKey();m.setPrivate(l,p,q);var k=d(j);var n=m.signString(r,k);return n}function h(p,o,n,m,l){var j=null;if(typeof l=="undefined"){j=d(p)}else{j=b(l)}var k=l.alg.substr(0,2)=="PS";if(m.hashAndSign){return b64tob64u(m.hashAndSign(j,n,"binary","base64",k))}else{if(k){return hextob64u(m.signStringPSS(n,j))}else{return hextob64u(m.signString(n,j))}}}function f(o,l,n,k,m){var j=a(o,l);return i(o,l,j,n,k,m)}this.generateJWSByNED=function(q,m,p,l,o){if(!this.isSafeJSONString(q)){throw"JWS Head is not safe JSON string: "+q}var k=a(q,m);var n=i(q,m,k,p,l,o);var j=hextob64u(n);this.parsedJWS={};this.parsedJWS.headB64U=k.split(".")[0];this.parsedJWS.payloadB64U=k.split(".")[1];this.parsedJWS.sigvalB64U=j;return k+"."+j};this.generateJWSByKey=function(o,m,j){var n={};if(!this.isSafeJSONString(o,n,"headP")){throw"JWS Head is not safe JSON string: "+o}var l=a(o,m);var k=h(o,m,l,j,n.headP);this.parsedJWS={};this.parsedJWS.headB64U=l.split(".")[0];this.parsedJWS.payloadB64U=l.split(".")[1];this.parsedJWS.sigvalB64U=k;return l+"."+k};function c(p,o,n,k){var m=new RSAKey();m.readPrivateKeyFromPEMString(k);var j=d(p);var l=m.signString(n,j);return l}this.generateJWSByP1PrvKey=function(o,m,j){if(!this.isSafeJSONString(o)){throw"JWS Head is not safe JSON string: "+o}var l=a(o,m);var n=c(o,m,l,j);var k=hextob64u(n);this.parsedJWS={};this.parsedJWS.headB64U=l.split(".")[0];this.parsedJWS.payloadB64U=l.split(".")[1];this.parsedJWS.sigvalB64U=k;return l+"."+k}};
/*
 * BBP customizations:
 *  - capability to pass an access_token as parameter
 *  - OpenID Connect id_token validation
 *  - OpenID Connect access_token validation
 *
 */
(function(exp, $) {

	var
		config = {},
		default_lifetime = 3600,
		options = {
			"debug": false
		},

		api_redirect,
		Api_default_storage,
		api_storage = {},

		internalStates = [],
		validationFailed = false;
	/*
	 * ------ SECTION: Utilities
	 */

	/*
	 * Returns a random string used for state
	 */
	var uuid = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	};

	/**
	 * A log wrapper, that only logs if logging is turned on in the config
	 * @param  {string} msg Log message
	 */
	var log = function(msg) {
		if (!options.debug) return;
		if (!console) return;
		if (!console.log) return;

		// console.log("LOG(), Arguments", arguments, msg)
		if (arguments.length > 1) {
			console.log(arguments);
		} else {
			console.log(msg);
		}

	};

	/**
	 * Set the global options.
	 */
	var setOptions = function(opts) {
		if (!opts) return;
		for(var k in opts) {
			if (opts.hasOwnProperty(k)) {
				options[k] = opts[k];
			}
		}
		log("Options is set to ", options);

		if(opts.token) {
			api_storage.wipeTokens(opts.token.provider);
			api_storage.saveToken(opts.token.provider, opts.token.value);
		}

	};

	/*
	 * Takes an URL as input and a params object.
	 * Each property in the params is added to the url as query string parameters
	 */
	var encodeURL = function(url, params) {
		var res = url;
		var k = '', i = 0;
		var firstSeparator = (url.indexOf("?") === -1) ? '?' : '&';
		for(k in params) {
			res += (i++ === 0 ? firstSeparator : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
		}
		return res;
	};


	/*
	 * Returns epoch, seconds since 1970.
	 * Used for calculation of expire times.
	 */
	var epoch = function() {
		return Math.round(new Date().getTime()/1000.0);
	};



	var parseQueryString = function (qs) {
		var e,
			a = /\+/g,  // Regex for replacing addition symbol with a space
			r = /([^&;=]+)=?([^&;]*)/g,
			d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
			q = qs,
			urlParams = {};

		while (e = r.exec(q))
		   urlParams[d(e[1])] = d(e[2]);

		return urlParams;
	};
	/*
	 * ------ / SECTION: Utilities
	 */






	/*
	 * Redirects the user to a specific URL
	 */
	api_redirect = function(url) {
		window.location = url;
	};

	Api_default_storage = function() {
		log("Constructor");
	};

	/**
		saveState stores an object with an Identifier.
		TODO: Ensure that both localstorage and JSON encoding has fallbacks for ancient browsers.
		In the state object, we put the request object, plus these parameters:
		  * restoreHash
		  * providerID
		  * scopes

	 */
	Api_default_storage.prototype.saveState =  function (state, obj) {
		localStorage.setItem("state-" + state, JSON.stringify(obj));
	};


	/**
	 * getStage()  returns the state object, but also removes it.
	 * @type {Object}
	 */
	Api_default_storage.prototype.getState = function(state) {
		// log("getState (" + state+ ")");
		var obj = JSON.parse(localStorage.getItem("state-" + state));
		localStorage.removeItem("state-" + state);
		return obj;
	};


	/*
	 * Checks if a token, has includes a specific scope.
	 * If token has no scope at all, false is returned.
	 */
	Api_default_storage.prototype.hasScope = function(token, scope) {
		var i;
		if (!token.scopes) return false;
		for(i = 0; i < token.scopes.length; i++) {
			if (token.scopes[i] === scope) return true;
		}
		return false;
	};

	/*
	 * Takes an array of tokens, and removes the ones that
	 * are expired, and the ones that do not meet a scopes requirement.
	 */
	Api_default_storage.prototype.filterTokens = function(tokens, scopes) {
		var i, j,
			result = [],
			now = epoch(),
			usethis;

		if (!scopes) scopes = [];

		for(i = 0; i < tokens.length; i++) {
			usethis = true;

			// Filter out expired tokens. Tokens that is expired in 1 second from now.
			if (tokens[i].expires && tokens[i].expires < (now+1)) usethis = false;

			// Filter out this token if not all scope requirements are met
			for(j = 0; j < scopes.length; j++) {
				if (!api_storage.hasScope(tokens[i], scopes[j])) usethis = false;
			}

			if (usethis) result.push(tokens[i]);
		}
		return result;
	};


	/*
	 * saveTokens() stores a list of tokens for a provider.

		Usually the tokens stored are a plain Access token plus:
		  * expires : time that the token expires
		  * providerID: the provider of the access token?
		  * scopes: an array with the scopes (not string)
	 */
	Api_default_storage.prototype.saveTokens = function(provider, tokens) {
		// log("Save Tokens (" + provider+ ")");
		localStorage.setItem("tokens-" + provider, JSON.stringify(tokens));
	};

	Api_default_storage.prototype.getTokens = function(provider) {
		// log("Get Tokens (" + provider+ ")");
		var tokens = JSON.parse(localStorage.getItem("tokens-" + provider));
		if (!tokens) tokens = [];

		log("Token received", tokens);
		return tokens;
	};
	Api_default_storage.prototype.wipeTokens = function(provider) {
		localStorage.removeItem("tokens-" + provider);
	};
	/*
	 * Save a single token for a provider.
	 * This also cleans up expired tokens for the same provider.
	 */
	Api_default_storage.prototype.saveToken = function(provider, token) {
		var tokens = this.getTokens(provider);
		tokens = api_storage.filterTokens(tokens);
		tokens.push(token);
		this.saveTokens(provider, tokens);
	};

	/*
	 * Get a token if exists for a provider with a set of scopes.
	 * The scopes parameter is OPTIONAL.
	 */
	Api_default_storage.prototype.getToken = function(provider, scopes) {
		var tokens = this.getTokens(provider);
		tokens = api_storage.filterTokens(tokens, scopes);
		if (tokens.length < 1) return null;
		return tokens[0];
	};

	api_storage = new Api_default_storage();










	/**
	 * Check if the hash contains an access token.
	 * And if it do, extract the state, compare with
	 * config, and store the access token for later use.
	 *
	 * The url parameter is optional. Used with phonegap and
	 * childbrowser when the jso context is not receiving the response,
	 * instead the response is received on a child browser.
	 */
	exp.jso_checkfortoken = function(providerID, url, callback) {
		var
			atoken,
			h = window.location.hash,
			now = epoch(),
			state,
			co;

		// If a url is provided
		if (url) {
			// log('Hah, I got the url and it ' + url);
			if(url.indexOf('#') === -1) return;
			h = url.substring(url.indexOf('#'));
			log('Hah, I got the hash and it is ' +  h);
		}

		/*
		 * Start with checking if there is a token in the hash
		 */
		if (h.length < 2) return;
		if (h.indexOf("access_token") === -1) return;
		h = h.substring(1);
		atoken = parseQueryString(h);

		if (atoken.state) {
			state = api_storage.getState(atoken.state);
		} else {
			if (!providerID) {throw "Could not get [state] and no default providerid is provided.";}
			state = {providerID: providerID};
		}


		if (!state) throw "Could not retrieve state";
		if (!state.providerID) throw "Could not get providerid from state";
		if (!config[state.providerID]) throw "Could not retrieve config for this provider.";
		co = config[state.providerID];

		/**
		 * If state was not provided, and default provider contains a scope parameter
		 * we assume this is the one requested...
		 */
		if (!atoken.state && co.scope) {
			state.scopes = co.scope;
			log("Setting state: ", state);
		}
		log("Checking atoken ", atoken, " and co ", co);

		/*
		 * Decide when this token should expire.
		 * Priority fallback:
		 * 1. Access token expires_in
		 * 2. Life time in config (may be false = permanent...)
		 * 3. Specific permanent scope.
		 * 4. Default library lifetime:
		 */
		if (atoken["expires_in"]) {
			atoken["expires"] = now + parseInt(atoken["expires_in"], 10);
		} else if (co["default_lifetime"] === false) {
			// Token is permanent.
		} else if (co["default_lifetime"]) {
			atoken["expires"] = now + co["default_lifetime"];
		} else if (co["permanent_scope"]) {
			if (!api_storage.hasScope(atoken, co["permanent_scope"])) {
				atoken["expires"] = now + default_lifetime;
			}
		} else {
			atoken["expires"] = now + default_lifetime;
		}

		/*
		 * Handle scopes for this token
		 */
		if (atoken["scope"]) {
			atoken["scopes"] = atoken["scope"].split(" ");
		} else if (state["scopes"]) {
			atoken["scopes"] = state["scopes"];
		}

		// validation
		var valid = validateTokens(co, atoken.access_token, atoken.id_token);

		if(valid) {
			//console.log("---->", state.providerID, atoken.access_token);
			api_storage.saveToken(state.providerID, atoken);

			if (state.restoreHash) {
				window.location.hash = state.restoreHash;
			} else {
				window.location.hash = '';
			}

			log(atoken);

			if (internalStates[atoken.state] && typeof internalStates[atoken.state] === 'function') {
				// log("InternalState is set, calling it now!");
				internalStates[atoken.state]();
				delete internalStates[atoken.state];
			}

			if (typeof callback === 'function') {
				callback();
			}

		} else {
			validationFailed = true;
		}
	};

	var validateTokens = function(clientConfig, access_token, id_token_str) {

		log("tokens validation...");

        var jsonWebKeys = clientConfig.jsonWebKeys;

		// checking id_token
		if(id_token_str) {

			/*
			 * verify signature
			 */
			var hN = b64utohex(jsonWebKeys.keys[0].n);
			var hE = b64utohex(jsonWebKeys.keys[0].e);

			var jws = new KJUR.jws.JWS();
			var result = 0;

			try {
				result = jws.verifyJWSByNE(id_token_str, hN, hE);
			} catch (ex) {
				alert("Error: " + ex);
			    result = 0;
			}

			if(result != 1) {
				log("JWS signature is *Invalid*");
				return;
			}

			var id_token_payload = JSON.parse(jws.parsedJWS.payloadS);
			log("id_token", id_token_payload);

			/*
			 * client_id in aud
			 */
			var client_id = clientConfig.client_id;
			if(id_token_payload.aud.indexOf(client_id) < 0) {
				log("id_token does not contain " + client_id + " client as AUD");
				return false;
			}

			/*
			 * check issuer is the as server
			 */
			if(id_token_payload.iss != clientConfig.auth_server) {
				alert("expected issuer: " + clientConfig.auth_server + ", actual issuer: " + id_token_payload.iss);
				return false;
			}

			/*
			 * check expiration
			 */
			if (id_token_payload.exp && id_token_payload.exp < (epoch()+1)) {
				log("id_token exipred!");
				return false;
			}

			/*
			 * check at_hash claim (http://openid.net/specs/openid-connect-implicit-1_0-11.html#access.token.validation)
			 */
			if(id_token_payload.at_hash) {

				// 1) Hash the octets of the ASCII representation of the access_token (jwk alg is "RS256")
				var hash = CryptoJS.SHA256(access_token);
				// 2a) Take the left-most half of the hash...
				var wordArray = CryptoJS.lib.WordArray.create( hash.words.slice(0, hash.words.length/2) );
				// 2b) ...and base64url encode it
				var hashInBase64 = CryptoJS.enc.Base64.stringify(wordArray);
				var hashInBase64U = b64tob64u( hashInBase64 );

				if(id_token_payload.at_hash != hashInBase64U) {
					log("at_hash claim in id_token doesn't match access_token hash: " + hashInBase64U + " != " + id_token_payload.at_hash);
					return false;
				}

			}
		}

		log("validation OK!");
		return true;
	};

	/*
	 * A config object contains:
	 */
	var jso_authrequest = function(providerid, scopes, callback) {

		var
			state,
			request,
			authurl,
			co;

		if (!config[providerid]) throw "Could not find configuration for provider " + providerid;
		co = config[providerid];

		log("About to send an authorization request to [" + providerid + "]. Config:");
		log(co);

		state = uuid();
		request = {
			"response_type": "token"
		};
		request.state = state;

		if (callback && typeof callback === 'function') {
			internalStates[state] = callback;
		}


		if (co["redirect_uri"]) {
			request["redirect_uri"] = co["redirect_uri"];
		}
		if (co["client_id"]) {
			request["client_id"] = co["client_id"];
		}
		if (scopes) {
			request["scope"] = scopes.join(" ");
		}

		authurl = encodeURL(co.authorization, request);

		// We'd like to cache the hash for not loosing Application state.
		// With the implciit grant flow, the hash will be replaced with the access
		// token when we return after authorization.
		if (window.location.hash) {
			request["restoreHash"] = window.location.hash;
		}
		request["providerID"] = providerid;
		if (scopes) {
			request["scopes"] = scopes;
		}


		log("Saving state [" + state+ "]");
		log(JSON.parse(JSON.stringify(request)));

		api_storage.saveState(state, request);
		api_redirect(authurl);

	};

	exp.jso_ensureTokens = function (ensure) {
		var providerid = '', scopes, token;
		for(providerid in ensure) {
			scopes = undefined;
			if (ensure[providerid]) scopes = ensure[providerid];
			token = api_storage.getToken(providerid, scopes);

			log("Ensure token for provider [" + providerid + "] ");
			log(token);

			if (token === null && !validationFailed) {
				jso_authrequest(providerid, scopes);
			}
		}

		return true;
	};

	exp.jso_findDefaultEntry = function(c) {
		var
			k = '',
			i = 0;

		if (!c) return;
		log("c", c);
		for(k in c) {
			i++;
			if (c[k].isDefault && c[k].isDefault === true) {
				return k;
			}
		}
		if (i === 1) return k;
	};

	exp.jso_configure = function(c, opts) {
		config = c;
		setOptions(opts);
		try {

			var def = exp.jso_findDefaultEntry(c);
			log("jso_configure() about to check for token for this entry", def);
			exp.jso_checkfortoken(def);

		} catch(e) {
			log("Error when retrieving token from hash: " + e);
			window.location.hash = "";
		}

	};

	exp.jso_dump = function() {
		var key = '';
		for(key in config) {

			log("=====> Processing provider [" + key + "]");
			log("=] Config");
			log(config[key]);
			log("=] Tokens");
			log(api_storage.getTokens(key));

		}

	};

	exp.jso_wipe = function() {
		var key = '';
		log("jso_wipe()");
		for(key in config) {
			log("Wipping tokens for " + key);
			api_storage.wipeTokens(key);
		}
	};

	exp.jso_getToken = function(providerid, scopes) {
		var token = api_storage.getToken(providerid, scopes);
		if (!token) return null;
		if (!token["access_token"]) return null;

		return token["access_token"];
	};

	exp.jso_registerRedirectHandler = function(callback) {
		api_redirect = callback;
	};

	exp.jso_registerStorageHandler = function(object) {
		api_storage = object;
	};

	// Export default storage to enable reseting it when needed.
	exp.jso_Api_default_storage = Api_default_storage;


	/*
	 * From now on, we only perform tasks that require jQuery.
	 * Like adding the $.oajax function.
	 */
	if (typeof $ === 'undefined') return;

	$.oajax = function(settings) {
		var
			allowia,
			scopes,
			token,
			providerid,
			co;

		providerid = settings.jso_provider;
		allowia = settings.jso_allowia || false;
		scopes = settings.jso_scopes;
		token = api_storage.getToken(providerid, scopes);
		co = config[providerid];

		// var successOverridden = settings.success;
		// settings.success = function(response) {
		// }

		var errorOverridden = settings.error || null;

		var performAjax = function() {
			// log("Perform ajax!");

			if (!token) throw "Could not perform AJAX call because no valid tokens was found.";

			if (co["presenttoken"] && co["presenttoken"] === "qs") {
				// settings.url += ((h.indexOf("?") === -1) ? '?' : '&') + "access_token=" + encodeURIComponent(token["access_token"]);
				if (!settings.data) settings.data = {};
				settings.data["access_token"] = token["access_token"];
			} else {
				if (!settings.headers) settings.headers = {};
				settings.headers["Authorization"] = "Bearer " + token["access_token"];
			}
			$.ajax(settings);
		};

		settings.error = function(jqXHR, textStatus, errorThrown) {
			log('error(jqXHR, textStatus, errorThrown)');
			log(jqXHR);
			log(textStatus);
			log(errorThrown);

			if (jqXHR.status === 401 || jqXHR.status === 403) {

				log("Token expired or not valid. About to delete this token");
				log(token);
				api_storage.wipeTokens(providerid);

			}
			if (errorOverridden && typeof errorOverridden === 'function') {
				errorOverridden(jqXHR, textStatus, errorThrown);
			}
		};


		if (!token) {
			if (allowia) {
				log("Perform authrequest");
				jso_authrequest(providerid, scopes, function() {
					token = api_storage.getToken(providerid, scopes);
					performAjax();
				});
				return;
			} else {
				throw "Could not perform AJAX call because no valid tokens was found.";
			}
		}


		performAjax();
	};


})(window, window.jQuery);

/* global jso_configure, jso_ensureTokens, jso_getToken, jso_wipe */
(function(exp){
    'use strict';

    /* http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/ */
    function deepExtend(destination, source) {
        for (var property in source) {
            if (source[property] && source[property].constructor &&
                source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                deepExtend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function JsoWrapper(options) {
        var provider, jsoConfig, jsoOptions, scopes;

        provider = options.clientId + '@' + options.authServer;
        jsoConfig = {
            client_id: options.clientId,
            redirect_uri: options.redirectUri,
            authorization: options.authServer+'/authorize'+(
                options.alwaysPromptLogin ? '?prompt=login' : ''
            ),
            auth_server: options.authServer+'/',
            jsonWebKeys: options.jsonWebKeys
        };
        jsoOptions = {
            debug: options.debug,
            // should contains {access_token, scopes[], expires_in, token_type}
            token: (options.token ?
                { provider: provider, value: options.token } :
                null)
        };
        scopes = options.scopes;

        this.configure = function() {
            var providerConfig = {};
            providerConfig[provider] = jsoConfig;
            return jso_configure(providerConfig, jsoOptions);
        };

        this.ensureTokens = function() {
            var scopesToEnsure = {};
            scopesToEnsure[provider] = scopes;
            return jso_ensureTokens(scopesToEnsure);
        };

        this.getToken = function() {
            return jso_getToken(provider, scopes);
        };

        this.wipe = function() {
            return jso_wipe();
        };
    }

    /*
     * the options are:
     *  - clientId: string - Oauth client id (required)
     *  - authServer: string - authentication server url (default: https://services.humanbrainproject.eu/oidc/)
     *  - redirectUri: string - URL where to redirect after authentication.
     *    The URL must be configured in the Oauth client configuration. (default: document.URL)
     *  - scopes: array<string> - list of scopes to request (default: null)
     *  - ensureToken: boolean - if `true` it will try to get a token (default: true)
     *  - alwaysPromptLogin: boolean - if `true` if will always prompt for credentials. (default: false)
     *    For collaboratory apps MUST be `false`. (default: false)
     *  - token: string - the token, if available (default: null)
     *  - debug: boolean - flag to enable debug logs (default: false)
     */
    function BbpOidcClient(options) {
        var jso;

        // default values
        var defaultOpts = {
            authServer: 'https://services.humanbrainproject.eu/oidc',
            debug: false,
            redirectUri: document.URL,
            scopes: null,
            ensureToken: true,
            alwaysPromptLogin: false,
            jsonWebKeys: {
                keys: [{
                    alg: 'RS256',
                    e: 'AQAB',
                    kty: 'RSA',
                    kid: 'bbp-oidc',
                    n: 'zlJpDPnGMUV5FlwQs5eIs77pdZTST29TELUT3_E1sKrN-lE4rEgbQQ5qU1KvF5669VmVeAt' +
                        '-BQ2qMjGjUyl44gq-aUkeQV7MXfYJfKHIULZMTGR0lJ4ebPRQgM5OWDNjYVbASAOz0NyO6' +
                        '46G5H5BlHZrA9ADyrZYZ4CEhfI1KBk'
                }]
            },
            token: null
        };

        var opts = deepExtend(defaultOpts, options);

        function init() {
            jso = new JsoWrapper(opts);
            jso.configure();

            // This check has to occurs every time.
            if (opts.ensureToken) {
                if(!jso.getToken()) {
                    // if there's no token, check if the session with oidc is still active
                    getTokenOrLogout();
                }
            }
        }

        function login() {
            return jso.ensureTokens();
        }

        function logout() {
            // Ensure we have a token.
            var token = getToken();
            var localRemoval = function() {
                // We need to keep the token to generate
                // Bearer for this request. Hence the reset only after.
                jso.wipe();

                if (opts.ensureToken) {
                    login();
                }
            };

            var oReq = new XMLHttpRequest();
            oReq.onload = localRemoval;
            oReq.open('post', opts.authServer + '/slo', true);
            oReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            oReq.withCredentials = true;
            oReq.send(JSON.stringify({ token: token }));
        }

        function getToken() {
            return jso.getToken();
        }

        /**
         * checks if the session with oidc is still active; if so, tries to get
         * a new token, otherwise notifies the parent window.
         */
        function getTokenOrLogout() {
            var clientId = opts.clientId;
            isSessionActive(function(active) {
                if(!active) {
                    // notify the parent window that a new login is needed
                    postLogoutMsg(clientId);
                }
                // ensure token in any case
                // if active == true, it will get a new token, otherwise redirect to login
                jso.ensureTokens();
            });
        }

        function postLogoutMsg(clientId) {
            if(window.parent && window !== window.top) {
                window.parent.postMessage({
                    eventName: 'oidc.logout',
                    data: {
                        clientId: clientId
                    }
                }, '*');
            }
        }

        var sessionReqInProgress = false;
        var pendingCallbacks = [];
        function isSessionActive(callback) {
            if(callback) {
                pendingCallbacks.push(callback);
            }
            if(!sessionReqInProgress) {
                sessionReqInProgress = true;
                var oReq = new XMLHttpRequest();
                oReq.onload = function() {
                    sessionReqInProgress = false;
                    var active = this.status === 200;
                    for(var i = 0; i < pendingCallbacks.length; i++) {
                        try {
                            pendingCallbacks[i](active);
                        } catch(err) {
                            console.error('Error invoking isSessionActive callback:', err); // jshint ignore:line
                        }
                    }
                    pendingCallbacks = [];
                };

                oReq.open('get', opts.authServer + '/session', true);
                oReq.withCredentials = true;
                oReq.send();
            }
        }

        init();

        return {
            setAlwaysPromptLogin: function(value) {
                var newVal = !!value;
                if(opts.alwaysPromptLogin !== newVal) {
                    opts.alwaysPromptLogin = newVal;
                    init();
                }
            },
            setEnsureToken: function(value) {
                var newVal = !!value;
                if(opts.ensureToken !== newVal) {
                    opts.ensureToken = newVal;
                    init();
                }
            },
            isEnsureToken: function() {
                return opts.ensureToken;
            },
            getTokenOrLogout: getTokenOrLogout,
            getToken: getToken,
            wipeToken: jso.wipe,
            logout: logout,
            login: login
        };
    }

    exp.BbpOidcClient = BbpOidcClient;

})(window);
