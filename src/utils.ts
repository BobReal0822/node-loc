import * as Fs from 'fs';
import * as Path from 'path';

const PackagePath = Path.join(__dirname, './../..', 'package.json');

/**
 * Get package version.
 *
 * @export getVersion
 * @returns {string}
 */
export function getVersion(): string {
    const packageInfo = JSON.parse(Fs.readFileSync(PackagePath, 'utf8'));

    return packageInfo && packageInfo.version || 'invalid version!';
}

export const ExtensionJustify = {
    '.ts': 'typescript',
    '.tsx': 'tsx'
};
