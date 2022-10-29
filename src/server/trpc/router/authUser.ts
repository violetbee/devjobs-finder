import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const authUserRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string({ required_error: "Lütfen bir isim giriniz" }),
        email: z.string({
          required_error: "Lütfen geçerli bir mail adresi giriniz",
        }),
        password: z
          .string({ required_error: "Şifre giriniz" })
          .min(6, "Şifre 6 karakterden daha az olamaz"),
        image: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(input.password, salt);
      await ctx.prisma.account.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          image: input.image,
        },
      });
      return {
        msg: "registered successfully",
      };
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z
          .string({ required_error: "Lütfen bir mail adresi giriniz" })
          .email(),
        password: z.string().min(3, "Şifre 3 karakterden daha aşağı olamaz"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userPassword = await ctx.prisma.account.findUnique({
        where: {
          email: input.email,
        },
        select: {
          password: true,
        },
      });

      if (userPassword) {
        const isEqual = bcrypt.compareSync(
          input.password,
          userPassword?.password
        );
        console.log("burası");
        if (isEqual) {
          const user = await ctx.prisma.account.findUnique({
            where: {
              email: input.email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              companyId: true,
            },
          });
          return {
            user,
          };
        } else {
          return "şifre yanlış";
        }
      } else {
        return "İşlem başarılı olamadı.";
      }
    }),
});
