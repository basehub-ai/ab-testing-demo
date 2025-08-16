import { basehub } from "basehub";
import { NextRequest, NextResponse } from "next/server";

function selectRandomVariant(variants: string[]): string {
  return variants[Math.floor(Math.random() * variants.length)];
}

export async function middleware(request: NextRequest) {
  // Skip if not root path
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  // Get variants from BaseHub
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
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
  const availableVariants = settings.variants.variants.map((v) => v.apiName);

  // Get existing variant from cookie
  let selectedVariant = request.cookies.get(VARIANT_COOKIE)?.value;

  // If no variant in cookie or invalid variant, assign one
  if (!selectedVariant || !availableVariants.includes(selectedVariant)) {
    selectedVariant = selectRandomVariant(availableVariants);
  }

  // Rewrite to variant path (keeps URL clean)
  const response = NextResponse.rewrite(
    new URL(`/${selectedVariant}`, request.url)
  );

  // Set variant cookie for persistence
  response.cookies.set(VARIANT_COOKIE, selectedVariant, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: "/",
};
