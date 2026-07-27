import { Presentation } from '../../../presentation/domain/entities/presentation.entity';
import { Slide } from '../../../presentation/domain/entities/slide.entity';

export class ProjectionSession {

    constructor(
        public readonly id: string,
        public readonly presentation: Presentation,
        private currentIndex = 0,
    ) { }

    getCurrentSlide(): Slide {
        return this.presentation.slides[this.currentIndex];
    }

    getCurrentIndex(): number {
        return this.currentIndex;
    }

    next(): Slide {

        if (this.currentIndex < this.presentation.slides.length - 1) {
            this.currentIndex++;
        }

        return this.getCurrentSlide();

    }

    previous(): Slide {

        if (this.currentIndex > 0) {
            this.currentIndex--;
        }

        return this.getCurrentSlide();

    }

    hasNext(): boolean {

        return this.currentIndex < this.presentation.slides.length - 1;

    }

    hasPrevious(): boolean {

        return this.currentIndex > 0;

    }

    goTo(index: number): Slide {

        if (
            index >= 0 &&
            index < this.presentation.slides.length
        ) {
            this.currentIndex = index;
        }

        return this.getCurrentSlide();

    }

    isFinished(): boolean {

        return this.currentIndex ===
            this.presentation.slides.length - 1;

    }

    totalSlides(): number {

        return this.presentation.slides.length;

    }

}