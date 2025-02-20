if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/shabin-muhd/.gradle/caches/8.10.2/transforms/5302244a3739c558d82f70e38309cdbb/transformed/jetified-hermes-android-0.77.0-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/shabin-muhd/.gradle/caches/8.10.2/transforms/5302244a3739c558d82f70e38309cdbb/transformed/jetified-hermes-android-0.77.0-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

