import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from '../mocks/courses';
import { Course } from '../models/course';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService
      ]
    });
    coursesService = TestBed.inject(CoursesService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(coursesService).toBeTruthy();
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses()
      .subscribe(courses => {

        expect(courses).toBeTruthy();

        expect(courses.length).toBe(15);

        const course = courses.find(course => course.id == 12);
        expect(course?.id).toBeTruthy();
        expect(course?.title).toBeTruthy();
        expect(course?.category).toBeTruthy();
        expect(course?.lessonsCount).toBeTruthy();
        expect(typeof course?.title).toEqual('string');

      })

    const req = http.expectOne('/api/courses');

    expect(req.request.method).toEqual('GET');

    req.flush({payload: Object.values(COURSES)})

  })

  it('should find a course by id', () => {
    coursesService.findCourseById(12)
      .subscribe(course => {
        expect(course).toBeTruthy();
        expect(course.id).toBe(12);
      })

    const req = http.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);
  })

  it('should saves the course data', () => {
    const changes: Partial<Course> = {
      title: 'Testing Course'
    }
    coursesService.saveCourse(12, changes)
      .subscribe( course => {
        expect(course.id).toBe(12);
        expect(course.title).toEqual('Testing Course')
      });

    const req = http.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.title).toEqual('Testing Course');
    req.flush({
      ...COURSES[12],
      ...changes
    })
  })

  afterEach(() => {
    http.verify();
  })
});
