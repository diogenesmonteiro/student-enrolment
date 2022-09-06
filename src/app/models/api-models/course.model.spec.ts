import { Course } from '../api-models/course.model';

describe('Course', () => {
  it('should create an instance', () => {
    expect(new Course()).toBeTruthy();
  });
});
