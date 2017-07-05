/**
 * Created by pomy on 02/07/2017.
 */

export default function assert(condition: boolean, message: string) {
	if (!condition) {
		throw new Error(`[js2excel] ${message} Read doc: https://github.com/dwqs/js2excel#readme`);
	}
}
