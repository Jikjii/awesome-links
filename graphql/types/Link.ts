// /graphql/types/Link.ts
import { objectType, extendType } from "nexus";
import { User } from "./User";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("url");
    t.string("description");
    t.string("imageUrl");
    t.string("category");
    t.list.field("users", {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.link
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .users();
      },
    });
  },
});

// graphql/types/Link.ts
// code above unchanged
// the code below is a links query that gets back all the links in the db
// it defines its type as Query so the function knows its 'searching' the database
// then it it setting t as non-nullable so it knows it's not returning null and it must return some value
//then it maps through 'links' using field and sets the type to the Models exact type of Link thats inside
// of our schema
// then we are retunring findMany() to get all the links in the database that comply with our schema

export const LinksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("links", {
      type: "Link",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.link.findMany();
      },
    });
  },
});
