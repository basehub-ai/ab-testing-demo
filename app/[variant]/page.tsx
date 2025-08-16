import { VariantsEnum } from "@/basehub-types";
import { basehub } from "basehub";
import { BaseHubImage } from "basehub/next-image";
import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { Icon } from "basehub/react-icon";
import { VariantControls } from "../components/VariantControls";

export const generateStaticParams = async () => {
  const { settings } = await basehub().query({
    settings: {
      variants: {
        variants: {
          apiName: true,
        },
      },
    },
  });

  return settings.variants.variants.map((variant) => ({
    variant: variant.apiName,
  }));
};

export default async function Home({
  params,
}: {
  params: Promise<{ variant: VariantsEnum }>;
}) {
  const { variant } = await params;

  // // Get available variants for the controls
  // const { settings, homepage } = await basehub().query({
  //   settings: {
  //     variants: {
  //       variants: {
  //         apiName: true,
  //       },
  //     },
  //   },
  //   homepage: {
  //     __args: { variants: { variants: variant } },
  //     heroTitle: true,
  //     heroImage: {
  //       url: true,
  //       alt: true,
  //       width: true,
  //       height: true,
  //       blurDataURL: true,
  //     },
  //     primaryCta: {
  //       label: true,
  //       href: true,
  //     },
  //     secondaryCta: {
  //       label: true,
  //       href: true,
  //     },
  //     sections: {
  //       __typename: true,
  //       on_CalloutComponent: {
  //         title: true,
  //         body: { json: { content: true } },
  //       },
  //       on_FeaturesComponent: {
  //         title: true,
  //         features: {
  //           items: {
  //             _title: true,
  //             _id: true,
  //             icon: true,
  //             body: { json: { content: true } },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // const availableVariants = settings.variants.variants.map(
  //   (v) => v.apiName
  // ) as VariantsEnum[];

  // return (
  //   <div className="min-h-screen bg-white dark:bg-black">
  //     <VariantControls
  //       currentVariant={variant}
  //       availableVariants={availableVariants}
  //     />
  //     <div className="container mx-auto px-6 py-20 lg:px-8">
  //       <div className="grid lg:grid-cols-2 gap-16 items-center">
  //         {/* Content Section */}
  //         <div className="space-y-8">
  //           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight">
  //             {homepage.heroTitle}
  //           </h1>

  //           {/* CTA Buttons */}
  //           <div className="flex flex-col sm:flex-row gap-4 pt-4">
  //             {homepage.primaryCta?.label && (
  //               <a
  //                 href={homepage.primaryCta.href || "#"}
  //                 className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
  //               >
  //                 {homepage.primaryCta.label}
  //               </a>
  //             )}

  //             {homepage.secondaryCta?.label && (
  //               <a
  //                 href={homepage.secondaryCta.href || "#"}
  //                 className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
  //               >
  //                 {homepage.secondaryCta.label}
  //               </a>
  //             )}
  //           </div>
  //         </div>

  //         {/* Image Section */}
  //         <div className="relative">
  //           {homepage.heroImage?.url ? (
  //             <BaseHubImage
  //               src={homepage.heroImage.url}
  //               alt={homepage.heroImage.alt || "Hero image"}
  //               width={homepage.heroImage.width || 600}
  //               height={homepage.heroImage.height || 400}
  //               placeholder={homepage.heroImage.blurDataURL ? "blur" : "empty"}
  //               blurDataURL={homepage.heroImage.blurDataURL}
  //               className="w-full h-auto object-cover"
  //               priority
  //             />
  //           ) : (
  //             <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
  //               <div className="text-center">
  //                 <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>

  //     {/* Sections */}
  //     {homepage.sections && homepage.sections.length > 0 && (
  //       <div className="space-y-24 pt-24">
  //         {homepage.sections.map((section, index) => {
  //           if (section.__typename === "CalloutComponent") {
  //             return (
  //               <div key={index} className="text-center max-w-4xl mx-auto">
  //                 <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-6">
  //                   {section.title}
  //                 </h2>
  //                 <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
  //                   {section.body && (
  //                     <RichText content={section.body.json.content} />
  //                   )}
  //                 </div>
  //               </div>
  //             );
  //           }

  //           if (section.__typename === "FeaturesComponent") {
  //             return (
  //               <div key={index} className="max-w-7xl mx-auto">
  //                 <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white text-center mb-16">
  //                   {section.title}
  //                 </h2>
  //                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  //                   {section.features.items.map((feature) => (
  //                     <div
  //                       key={feature._id}
  //                       className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-200"
  //                     >
  //                       <div className="flex items-center mb-4">
  //                         <div className="w-10 h-10 flex-shrink-0 mr-4 text-black dark:text-white">
  //                           {feature.icon && <Icon content={feature.icon} />}
  //                         </div>
  //                         <h3 className="text-xl font-semibold text-black dark:text-white">
  //                           {feature._title}
  //                         </h3>
  //                       </div>
  //                       <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
  //                         {feature.body && (
  //                           <RichText content={feature.body.json.content} />
  //                         )}
  //                       </div>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             );
  //           }

  //           return null;
  //         })}
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <Pump
      queries={[
        {
          settings: {
            variants: {
              variants: {
                apiName: true,
              },
            },
          },
          homepage: {
            __args: { variants: { variants: variant } },
            heroTitle: true,
            heroImage: {
              url: true,
              alt: true,
              width: true,
              height: true,
              blurDataURL: true,
            },
            primaryCta: {
              label: true,
              href: true,
            },
            secondaryCta: {
              label: true,
              href: true,
            },
            sections: {
              __typename: true,
              on_CalloutComponent: {
                title: true,
                body: { json: { content: true } },
              },
              on_FeaturesComponent: {
                title: true,
                features: {
                  items: {
                    _title: true,
                    _id: true,
                    icon: true,
                    body: { json: { content: true } },
                  },
                },
              },
            },
          },
        },
      ]}
    >
      {async ([{ homepage, settings }]) => {
        "use server";

        const availableVariants = settings.variants.variants.map(
          (v) => v.apiName
        ) as VariantsEnum[];

        return (
          <div className="min-h-screen bg-white dark:bg-black">
            <VariantControls
              currentVariant={variant}
              availableVariants={availableVariants}
            />
            <div className="container mx-auto px-6 py-20 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Content Section */}
                <div className="space-y-8">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight">
                    {homepage.heroTitle}
                  </h1>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {homepage.primaryCta?.label && (
                      <a
                        href={homepage.primaryCta.href || "#"}
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                      >
                        {homepage.primaryCta.label}
                      </a>
                    )}

                    {homepage.secondaryCta?.label && (
                      <a
                        href={homepage.secondaryCta.href || "#"}
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
                      >
                        {homepage.secondaryCta.label}
                      </a>
                    )}
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative">
                  {homepage.heroImage?.url ? (
                    <BaseHubImage
                      src={homepage.heroImage.url}
                      alt={homepage.heroImage.alt || "Hero image"}
                      width={homepage.heroImage.width || 600}
                      height={homepage.heroImage.height || 400}
                      placeholder={
                        homepage.heroImage.blurDataURL ? "blur" : "empty"
                      }
                      blurDataURL={homepage.heroImage.blurDataURL}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sections */}
            {homepage.sections && homepage.sections.length > 0 && (
              <div className="space-y-24 pt-24">
                {homepage.sections.map((section, index) => {
                  if (section.__typename === "CalloutComponent") {
                    return (
                      <div
                        key={index}
                        className="text-center max-w-4xl mx-auto"
                      >
                        <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-6">
                          {section.title}
                        </h2>
                        <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                          {section.body && (
                            <RichText content={section.body.json.content} />
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (section.__typename === "FeaturesComponent") {
                    return (
                      <div key={index} className="max-w-7xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white text-center mb-16">
                          {section.title}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {section.features.items.map((feature) => (
                            <div
                              key={feature._id}
                              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-200"
                            >
                              <div className="flex items-center mb-4">
                                <div className="w-10 h-10 flex-shrink-0 mr-4 text-black dark:text-white">
                                  {feature.icon && (
                                    <Icon content={feature.icon} />
                                  )}
                                </div>
                                <h3 className="text-xl font-semibold text-black dark:text-white">
                                  {feature._title}
                                </h3>
                              </div>
                              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {feature.body && (
                                  <RichText
                                    content={feature.body.json.content}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </div>
        );
      }}
    </Pump>
  );
}
