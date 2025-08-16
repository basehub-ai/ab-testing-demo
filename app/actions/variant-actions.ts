"use server";

import { basehub } from "basehub";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setVariant(variant: string | null) {
  // Get variants and cookie name from BaseHub
  const { settings } = await basehub().query({
    settings: {
      variants: {
        _id: true,
        variants: {
          apiName: true,
        },
      },
    },
  });

  const VARIANT_COOKIE = "variant_" + settings.variants._id;
  const cookieStore = await cookies();

  if (variant === null) {
    // Delete the cookie
    cookieStore.delete(VARIANT_COOKIE);
  } else {
    // Set the new variant
    const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
    cookieStore.set(VARIANT_COOKIE, variant, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  // Redirect to home to trigger middleware
  redirect("/");
}
