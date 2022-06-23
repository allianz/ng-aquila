import { inject, TestBed, waitForAsync } from '@angular/core/testing';

import { NxPaginationModule } from './pagination.module';
import { NxPaginationUtils } from './pagination-utils';

describe('NxPaginationUtils', () => {
    function assertCheck(collection: any, length: any, values: any) {
        expect(collection).toHaveSize(length);
        for (let i = 0; i < values.length; i++) {
            expect(collection[i].label).toEqual(values[i]);
        }
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxPaginationModule],
            providers: [NxPaginationUtils],
        });
    }));

    describe('getStartArray() Method', () => {
        it('should show first 3 elements when current position is "1"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const startArray = utils.getStartArray(1, 21);
            assertCheck(startArray, 3, [1, 2, 3]);
        }));

        it('should show first 3 elements when current position is "5"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const startArray = utils.getStartArray(5, 21);
            assertCheck(startArray, 3, [1, 2, 3]);
        }));

        it('should show first 2 elements and ellipsis when current position is "6"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const startArray = utils.getStartArray(6, 21);
            assertCheck(startArray, 3, [1, 2, '...']);
        }));

        it('should show first 2 elements and ellipsis when current position is "21"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const startArray = utils.getStartArray(21, 21);
            assertCheck(startArray, 3, [1, 2, '...']);
        }));

        it('should show first 2 elements and ellipsis when current position is "21"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const startArray = utils.getStartArray(1, 1);
            assertCheck(startArray, 1, [1]);
        }));

        it('should show only one element current position is "1" and total "1"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const startArray = utils.getStartArray(1, 1);
            assertCheck(startArray, 1, [1]);
        }));

        it('should show only "1" and "2" element current position is "1" and total "2"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const startArray = utils.getStartArray(1, 2);
            assertCheck(startArray, 2, [1, 2]);
        }));

        it('should show first 3 elements when current position is "1" and total "3"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const startArray = utils.getStartArray(1, 3);
            assertCheck(startArray, 3, [1, 2, 3]);
        }));
    });

    describe('getMiddleArray() Method', () => {
        it('should have no elements when current position is "1" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(1, 10);
            assertCheck(middleArray, 0, []);
        }));

        it('should have no elements when current position is "2" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(2, 10);
            assertCheck(middleArray, 0, []);
        }));

        it('should show only "4" when current position is "3" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(3, 10);
            assertCheck(middleArray, 1, [4]);
        }));

        it('should show only "4" and "5" when current position is "4" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(4, 10);
            assertCheck(middleArray, 2, [4, 5]);
        }));

        it('should show "4", "5" and "6" when current position is "5" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(5, 10);
            assertCheck(middleArray, 3, [4, 5, 6]);
        }));

        it('should show "5", "6" and "7" when current position is "6" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(6, 10);
            assertCheck(middleArray, 3, [5, 6, 7]);
        }));

        it('should show only "6" and "7" when current position is "7" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(7, 10);
            assertCheck(middleArray, 2, [6, 7]);
        }));

        it('should show only "7" when current position is "8" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(8, 10);
            assertCheck(middleArray, 1, [7]);
        }));

        it('should have no elements when current position is "9" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(9, 10);
            assertCheck(middleArray, 0, []);
        }));

        it('should have no elements when current position is "1" and total "1"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(1, 1);
            assertCheck(middleArray, 0, []);
        }));

        it('should have no elements when current position is "1" and total "2"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(1, 2);
            assertCheck(middleArray, 0, []);
        }));

        it('should have no elements when current position is "1" and total "3"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(1, 3);
            assertCheck(middleArray, 0, []);
        }));

        it('should have no elements when current position is "1" and total "4"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(1, 4);
            assertCheck(middleArray, 0, []);
        }));

        it('should have no elements when current position is "1" and total "5"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(1, 5);
            assertCheck(middleArray, 0, []);
        }));

        it('should have no elements when current position is "1" and total "6"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(1, 6);
            assertCheck(middleArray, 0, []);
        }));

        it('should show only "4" when current position is "5" and total "7"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const middleArray = utils.getMiddleArray(5, 7);
            assertCheck(middleArray, 1, [4]);
        }));
    });

    describe('getEndArray() Method', () => {
        it('should show ellipsis and last 2 elements when current position is "1" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 10);
            assertCheck(endArray, 3, ['...', 9, 10]);
        }));

        it('should show ellipsis and last 2 elements when current position is "4" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(4, 10);
            assertCheck(endArray, 3, ['...', 9, 10]);
        }));

        it('should show ellipsis and last 2 elements when current position is "5" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(5, 10);
            assertCheck(endArray, 3, ['...', 9, 10]);
        }));

        it('should show last 3 elements when current position is "8" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(8, 10);
            assertCheck(endArray, 3, [8, 9, 10]);
        }));

        it('should show last 3 elements when current position is "10" and total "10"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(10, 10);
            expect(endArray).toHaveSize(3);
            assertCheck(endArray, 3, [8, 9, 10]);
        }));

        it('should have no elements when current position is "1" and total "1"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 1);
            assertCheck(endArray, 0, []);
        }));

        it('should have no elements when current position is "1" and total "2"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 2);
            assertCheck(endArray, 0, []);
        }));

        it('should have no elements when current position is "1" and total "3"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 3);
            assertCheck(endArray, 0, []);
        }));

        it('should show only "4" when current position is "1" and total "4"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 4);
            assertCheck(endArray, 1, [4]);
        }));

        it('should show only "4" and "5" when current position is "1" and total "5"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 5);
            assertCheck(endArray, 2, [4, 5]);
        }));

        it('should show ellipsis and last 2 elements when current position is "1" and total "6"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 6);
            assertCheck(endArray, 3, ['...', 5, 6]);
        }));

        it('should show ellipsis and last 2 elements when current position is "1" and total "7"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 7);
            assertCheck(endArray, 3, ['...', 6, 7]);
        }));

        it('should show ellipsis and last 2 elements when current position is "1" and total "8"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const endArray = utils.getEndArray(1, 8);
            assertCheck(endArray, 3, ['...', 7, 8]);
        }));
    });

    describe('getPages() Method: 21 elements example', () => {
        it('should show first 3 elements, ellipsis and last two elements when current page is "1" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(1, 21);
                assertCheck(pagesArray, 6, [1, 2, 3, '...', 20, 21]);
            },
        ));

        it('should show first 3 elements, ellipsis and last two elements when current page is "2" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(2, 21);
                assertCheck(pagesArray, 6, [1, 2, 3, '...', 20, 21]);
            },
        ));

        it('should show first 4 elements, ellipsis and last two elements when current page is "3" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(3, 21);
                assertCheck(pagesArray, 7, [1, 2, 3, 4, '...', 20, 21]);
            },
        ));

        it('should show first 5 elements, ellipsis and last two elements when current page is "4" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(4, 21);
                assertCheck(pagesArray, 8, [1, 2, 3, 4, 5, '...', 20, 21]);
            },
        ));

        it('should show first 6 elements, ellipsis and last two elements when current page is "5" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(5, 21);
                assertCheck(pagesArray, 9, [1, 2, 3, 4, 5, 6, '...', 20, 21]);
            },
        ));

        it('should "1", "2", ellipsis, "5", "6", "7", ellipsis again and last two elements when current page is "6" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(6, 21);
                assertCheck(pagesArray, 9, [1, 2, '...', 5, 6, 7, '...', 20, 21]);
            },
        ));

        it('should show "1","2", ellipsis, "15", "16", "17", ellipsis again and last two elements when current page is "16" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(16, 21);
                assertCheck(pagesArray, 9, [1, 2, '...', 15, 16, 17, '...', 20, 21]);
            },
        ));

        it('should show "1","2", ellipsis and last six elements when current page is "17" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(17, 21);
                assertCheck(pagesArray, 9, [1, 2, '...', 16, 17, 18, 19, 20, 21]);
            },
        ));

        it('should show "1","2", ellipsis and last five elements when current page is "18" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(18, 21);
                assertCheck(pagesArray, 8, [1, 2, '...', 17, 18, 19, 20, 21]);
            },
        ));

        it('should show "1","2", ellipsis and last four elements when current page is "19" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(19, 21);
                assertCheck(pagesArray, 7, [1, 2, '...', 18, 19, 20, 21]);
            },
        ));

        it('should show "1","2", ellipsis and last three elements when current page is "20" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(20, 21);
                assertCheck(pagesArray, 6, [1, 2, '...', 19, 20, 21]);
            },
        ));

        it('should show "1","2", ellipsis and last three elements when current page is "16" and total "21"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(21, 21);
                assertCheck(pagesArray, 6, [1, 2, '...', 19, 20, 21]);
            },
        ));
    });

    describe('getPages() Method: smaller paginations', () => {
        it('should show only 1 element when current page is "1" and total is "1"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const pagesArray = utils.getPages(1, 1);
            assertCheck(pagesArray, 1, [1]);
        }));

        it('should show only 2 elements when current page is "1" and total is "2"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const pagesArray = utils.getPages(1, 2);
            assertCheck(pagesArray, 2, [1, 2]);
        }));

        it('should show only 3 elements when current page is "1" and total is "3"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const pagesArray = utils.getPages(1, 3);
            assertCheck(pagesArray, 3, [1, 2, 3]);
        }));

        it('should show only 4 elements when current page is "1" and total is "4"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const pagesArray = utils.getPages(1, 4);
            assertCheck(pagesArray, 4, [1, 2, 3, 4]);
        }));

        it('should show only 5 elements when current page is "1" and total is "5"', inject([NxPaginationUtils], (utils: NxPaginationUtils) => {
            const pagesArray = utils.getPages(1, 5);
            assertCheck(pagesArray, 5, [1, 2, 3, 4, 5]);
        }));

        it('should show first three elements, ellipsis and last two elements when current page is "1" and total is "6"', inject(
            [NxPaginationUtils],
            (utils: NxPaginationUtils) => {
                const pagesArray = utils.getPages(1, 6);
                assertCheck(pagesArray, 6, [1, 2, 3, '...', 5, 6]);
            },
        ));
    });
});
