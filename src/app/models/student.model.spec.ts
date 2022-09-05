import { Student } from '../models/student.model';

describe('Student', () => {
  it('should create an instance', () => {
    expect(new Student()).toBeTruthy();
  });
});
