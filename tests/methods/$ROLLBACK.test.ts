import $ROLLBACK from '../../compiled/transformedMinor/craydent.http.rollback';
import * as $COMMIT from '../../compiled/transformedMinor/craydent.http.commit';
// jest.mock('../../compiled/transformedMinor/craydent.$COMMIT', () => {
//     return {
//         "default": {}
//     }
// });
describe('$ROLLBACK', () => {
    describe('JS', () => {
        beforeEach(() => {
            // ($COMMIT as any).default = {};
        });
        it('should run reset all committed values logic using global', () => {
            const commit: any = $COMMIT;
            commit.default['update'] = true;
            commit.default['noHistory'] = true;
            commit.default['search'] = 'search';
            commit.default['hash'] = 'hash';
            commit.default['onhashchange'] = () => { };

            $ROLLBACK();

            expect(commit.default).not.toHaveProperty('update');
            expect(commit.default).not.toHaveProperty('noHistory');
            expect(commit.default).not.toHaveProperty('search');
            expect(commit.default).not.toHaveProperty('hash');
            expect(commit.default).not.toHaveProperty('onhashchange');
        });
    });
});