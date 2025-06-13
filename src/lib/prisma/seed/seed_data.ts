import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const tutor = await prisma.profile.create({
    data: {
        userId: 'tutor-uid',
        fullName: 'Jane Tutor',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        role: 'tutor',
    },
    });

    const student = await prisma.profile.create({
    data: {
        userId: 'student-uid',
        fullName: 'John Student',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
        role: 'student',
    },
    });

    const classItem = await prisma.class.create({
    data: {
        name: 'Math 101',
        description: 'Intro to Algebra',
        createdBy: tutor.id,
    },
    });

    await prisma.enrollment.create({
    data: {
        profileId: student.id,
        classId: classItem.id,
    },
    });

    const assignment = await prisma.assignment.create({
    data: {
        classId: classItem.id,
        title: 'Homework 1',
        description: 'Solve linear equations',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // one week from now
    },
    });

    await prisma.submission.create({
    data: {
        assignmentId: assignment.id,
        profileId: student.id,
        content: 'x = 5',
    },
    });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
