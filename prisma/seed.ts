import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const bob = await prisma.user.create({
    data: {
      email: 'bobdog@gmail.com',
      firstName: 'Bob',
      lastName: 'Dog',
      mobile: '0432343234',
      password: 'seededPassword1!',
      id: 'dff49b18-5736-11ed-9b6a-0242ac120002',
    },
  });
  const stephanie = await prisma.user.create({
    data: {
      email: 'stephanie@gmail.com',
      firstName: 'Steph',
      lastName: 'Anie',
      mobile: '0432407769',
      password: 'seededPassword2!',
      id: 'e55e6b74-5736-11ed-9b6a-0242ac120002',
    },
  });

  const post1 = await prisma.post.create({
    data: {
      userId: 'dff49b18-5736-11ed-9b6a-0242ac120002',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat urna vel ante volutpat, ut elementum mi placerat. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt. Duis nec nunc vel urna ullamcorper eleifend ac id dolor. Phasellus vitae tortor ac metus laoreet rutrum. Aenean condimentum consequat elit, ut placerat massa mattis vitae. Vivamus dictum faucibus massa, eget euismod turpis pretium a. Aliquam rutrum rhoncus mi, eu tincidunt mauris placerat nec. Nunc sagittis libero sed facilisis suscipit. Curabitur nisi lacus, ullamcorper eu maximus quis, malesuada sit amet nisi. Proin dignissim, lacus vitae mattis fermentum, dui dolor feugiat turpis, ut euismod libero purus eget dui.',
      title: 'Post 1',
    },
  });
  const post2 = await prisma.post.create({
    data: {
      userId: 'e55e6b74-5736-11ed-9b6a-0242ac120002',
      content:
        'Proin ut sollicitudin lacus. Mauris blandit, turpis in efficitur lobortis, lectus lacus dictum ipsum, vel pretium ex lacus id mauris. Aenean id nisi eget tortor viverra volutpat sagittis sit amet risus. Sed malesuada lectus eget metus sollicitudin porttitor. Fusce at sagittis ligula. Pellentesque vel sapien nulla. Morbi at purus sed nibh mollis ornare sed non magna. Nunc euismod ex purus, nec laoreet magna iaculis quis. Mauris non venenatis elit. Curabitur varius lectus nisl, vitae tempus felis tristique sit amet.',
      title: 'Post 2',
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      content: 'I am a root comment',
      userId: bob.id,
      postId: post1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      content: 'I am a nested comment',
      userId: stephanie.id,
      postId: post1.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      content: 'I am another root comment',
      userId: stephanie.id,
      postId: post1.id,
    },
  });
}

seed();
